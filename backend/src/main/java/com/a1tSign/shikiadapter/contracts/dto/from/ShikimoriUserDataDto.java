package com.a1tSign.shikiadapter.contracts.dto.from;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors (chain = true)
public class ShikimoriUserDataDto {
    @JsonProperty("nickname")
    private String name;

    @JsonProperty("id")
    private String id;
}
