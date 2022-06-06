package com.a1tSign.shikiadapter.contracts.dto.to;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties (ignoreUnknown = true)
@JsonInclude (JsonInclude.Include.NON_EMPTY)
public class TokenRequest {

    private String username;
    private String password;
    private String role;
}
