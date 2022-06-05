package com.a1tSign.shikiadapter.contracts.dto.from.kodik;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KodikSeasonsDataDto {
    @JsonProperty("link")
    private String seasonLink;
    @JsonProperty("episodes")
    private Map<String, String> episodes;
}
