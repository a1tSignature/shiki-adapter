package com.a1tSign.shikiadapter.contracts.tools;

import com.a1tSign.shikiadapter.contracts.exception.ServiceUnavaibleShikiException;
import com.a1tSign.shikiadapter.contracts.exception.ShikiAdapterException;
import com.a1tSign.shikiadapter.contracts.exception.ErrorInUnknownFormatShikiException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.Response;
import feign.codec.ErrorDecoder;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

/**
 * Обработчик ошибок для Feign-клиентов, полученных от сервисов.
 * <p>
 * Данный обработчик производит попытку десериализации HTTP-тела ответа как {@link ShikiAdapterException}. Если сообщение
 * об ошибке имеет иной формат, то будет выброшено исключение {@link ErrorInUnknownFormatShikiException}, в поле
 * {@link ErrorInUnknownFormatShikiException#getResponseBody} будет записано тело ответа сервиса.
 * </p>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ShikiAdapterFeignErrorDecoder implements ErrorDecoder {
    private final ObjectMapper objectMapper;

    @Override
    public Exception decode(String methodKey, Response response) {
        int status = response.status();
        String body = bodyToString(response.body());
        try {
            if (body != null) {
                return objectMapper.readValue(body, ShikiAdapterException.class);
            }
            if (status == HttpStatus.SERVICE_UNAVAILABLE.value()) {
                return new ServiceUnavaibleShikiException("no message");
            }
            log.warn("{}: Cannot deserialize error: response has empty body. Rethrow ErrorInUnknownFormatRuipException",
                    methodKey);
            return new ErrorInUnknownFormatShikiException(status, "<empty body>");
        } catch (JsonProcessingException exception) {
            if (status == HttpStatus.SERVICE_UNAVAILABLE.value()) {
                return new ServiceUnavaibleShikiException(body);
            }
            log.warn("{}: Cannot deserialize error. Rethrow ErrorInUnknownFormatRuipException", methodKey, exception);
            return new ErrorInUnknownFormatShikiException(status, body);
        }
    }

    @SneakyThrows
    private static String bodyToString(Response.Body body) {
        if (body == null) {
            return null;
        }
        StringBuilder textBuilder = new StringBuilder();
        try (Reader reader = new BufferedReader(
                new InputStreamReader(body.asInputStream(), StandardCharsets.UTF_8)
        )) {
            int character;
            while ((character = reader.read()) != -1) {
                textBuilder.append((char) character);
            }
        }
        return textBuilder.toString();
    }
}

