package com.a1tSign.shikiadapter.contracts.exception;

import com.a1tSign.shikiadapter.contracts.tools.ShikiAdapterFeignErrorDecoder;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

/**
 * Неизвестная ошибка.
 * <p>
 * Исключение выбрасывается {@link ShikiAdapterFeignErrorDecoder} при получении ошибки в неизвестном формате.
 * В поле {@link #responseBody} записывается тело ответа.
 * </p>
 */
public class ErrorInUnknownFormatShikiException extends ServerShikiException {
    /**
     * Код исключения.
     */
    public static final String CODE = "ERROR_IN_UNKNOWN_FORMAT";

    @Getter
    private final String responseBody;

    @Getter
    private final int responseStatus;

    /**
     * Конструктор.
     *
     * @param responseStatusCode HTTP-код ответа.
     * @param responseBody       Содержимое тела ответа сервиса.
     */
    public ErrorInUnknownFormatShikiException(int responseStatusCode, String responseBody) {
        this(
                CODE,
                "Service returned an error in unexpected format "
                        + "["
                        + "status = " + responseStatusCode + ", "
                        + "body = '" + (responseBody == null ? "<empty>" : responseBody) + "'"
                        + "]",
                responseBody,
                responseStatusCode
        );
    }

    @JsonCreator
    private ErrorInUnknownFormatShikiException(
            @JsonProperty ("code") String code,
            @JsonProperty("message") String message,
            @JsonProperty("responseBody") String responseBody,
            @JsonProperty("responseStatus") int responseStatus
    ) {
        super(code, message);
        this.responseBody = responseBody;
        this.responseStatus = responseStatus;
    }
}