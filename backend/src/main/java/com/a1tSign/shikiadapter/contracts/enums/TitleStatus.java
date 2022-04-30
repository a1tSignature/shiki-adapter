package com.a1tSign.shikiadapter.contracts.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum TitleStatus {

    ANONS("anons"),
    ONGOING("ongoing"),
    RELEASED("released");

    private final String name;

    public static TitleStatus of(String val) {

        return Arrays.stream(values())
                .filter(value -> value.getName().equals(val)).findFirst()
                .orElseThrow(() ->  new RuntimeException("Title type not found"));
    }
}
