package com.a1tSign.shikiadapter.contracts.exception;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Сервис не доступен.
 */
@ResponseStatus (HttpStatus.SERVICE_UNAVAILABLE)
public class ServiceUnavaibleShikiException extends ServerShikiException {
    /**
     * Код по умолчанию.
     */
    public static final String CODE = "SERVICE_UNAVAILABLE";

    /**
     * Конструктор.
     *
     * @param message Текстовое описание ошибки.
     */
    public ServiceUnavaibleShikiException(String message) {
        this(CODE, message);
    }

    /**
     * Конструктор.
     *
     * @param code    Код ошибки.
     * @param message Текстовое описание ошибки.
     */
    @JsonCreator
    protected ServiceUnavaibleShikiException(
            @JsonProperty ("code") String code, @JsonProperty("message") String message
    ) {
        super(code, message);
    }
}
