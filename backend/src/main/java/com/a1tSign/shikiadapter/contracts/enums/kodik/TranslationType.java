package com.a1tSign.shikiadapter.contracts.enums.kodik;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

/**
 * Types of translations for prioritization.
 */
@Getter
@RequiredArgsConstructor
public enum TranslationType {

    /**
     * Voiceover.
     */
    VOICE("voice"),
    /**
     * Subtites.
     */
    SUBTITLES("subtitles");

    private final String name;

    public static TranslationType of(String val) {

        return Arrays.stream(values())
                .filter(value -> value.getName().equals(val)).findFirst()
                .orElseThrow(() ->  new RuntimeException("Title type not found"));
    }
}
