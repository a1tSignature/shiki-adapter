package com.a1tSign.shikiadapter.exception;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus (HttpStatus.INTERNAL_SERVER_ERROR)
@JsonTypeInfo (use = JsonTypeInfo.Id.CLASS, property = "@type")
@JsonIgnoreProperties (value = {"cause", "stackTrace", "suppressed", "localizedMessage"})
public class ShikiAdapterException extends RuntimeException {

    @Getter
    private final String code;

    /**
     * Конструктор.
     *
     * @param code    Код ошибки.
     * @param message Текстовое описание ошибки.
     */
    @JsonCreator
    public ShikiAdapterException(@JsonProperty ("code") String code, @JsonProperty("message") String message) {
        super(message);
        this.code = code;
    }
}
