package com.a1tSign.shikiadapter.contracts.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Role {

    GUEST("guest"),

    USER("user"),

    MODERATOR("moderator"),

    ADMIN("admin");

    private final String name;
}
