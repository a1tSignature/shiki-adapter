package com.a1tSign.shikiadapter.contracts.tools;

import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import feign.Response;
import feign.codec.DecodeException;
import feign.codec.Decoder;
import feign.jackson.JacksonDecoder;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.lang.reflect.Type;

/**
 * ByteArrayResource decoder.
 */
@RequiredArgsConstructor
public class ByteArrayDecoder  implements Decoder {

    private final ObjectMapper objectMapper;

    @Override
    public Object decode(Response response, Type type) throws IOException, DecodeException, FeignException {
        if (type instanceof Class && ByteArrayResource.class.isAssignableFrom((Class<?>) type)) {
            return new ByteArrayResource(StreamUtils.copyToByteArray(
                    response.body() != null ? response.body().asInputStream() : null));
        }
        return new JacksonDecoder(objectMapper).decode(response, type);
    }
}
