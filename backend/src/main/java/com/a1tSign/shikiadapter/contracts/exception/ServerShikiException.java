package com.a1tSign.shikiadapter.contracts.exception;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus (HttpStatus.INTERNAL_SERVER_ERROR)
public class ServerShikiException extends ShikiAdapterException {
    /**
     * Код по умолчанию.
     */
    public static final String CODE = "SERVER_ERROR";

    /**
     * Конструктор.
     *
     * @param message Текстовое описание ошибки.
     */
    public ServerShikiException(String message) {
        this(CODE, message);
    }

    /**
     * Конструктор.
     *
     * @param code    Код ошибки.
     * @param message Текстовое описание ошибки.
     */
    @JsonCreator
    protected ServerShikiException(
            @JsonProperty ("code") String code, @JsonProperty("message") String message
    ) {
        super(code, message);
    }
}
