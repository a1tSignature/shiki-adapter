package com.a1tSign.shikiadapter.contracts.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Optional;

@RequiredArgsConstructor
@Getter
public enum TitleType {

    TV("tv"),
    MOVIE("movie"),
    OVA("ova"),
    ONA("ona"),
    SPECIAL("special"),
    MUSIC("music"),
    TV_13("tv_13"),
    TV_24("tv_24"),
    TV_48("tv_48");

    private final String value;

    public static TitleType of(String val) {

        return Arrays.stream(values())
                .filter(value -> value.getValue().equals(val)).findFirst()
                .orElseThrow(() ->  new RuntimeException("Title type not found"));
    }
}
