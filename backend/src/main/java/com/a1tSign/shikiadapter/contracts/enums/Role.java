package com.a1tSign.shikiadapter.contracts.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@RequiredArgsConstructor
@Getter
public enum Role {

    GUEST("guest"),

    USER("user"),

    MODERATOR("moderator"),

    ADMIN("admin");

    private final String name;

    public static Role of(String val) {

        return Arrays.stream(values())
                .filter(value -> value.getName().equals(val)).findFirst()
                .orElseThrow(() ->  new RuntimeException("Title type not found"));
    }
}
