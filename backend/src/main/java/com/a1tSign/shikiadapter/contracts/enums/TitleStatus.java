package com.a1tSign.shikiadapter.contracts.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TitleStatus {

    ANONS("anons"),
    ONGOING("ongoing"),
    RELEASED("released");

    private final String name;
}
