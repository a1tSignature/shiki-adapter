package com.a1tSign.shikiadapter.contracts.dto.from.kodik;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

/**
 * DTO for kodik-api repsonse.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class KodikResponseDto {

    private String time;

    private String total;

    @JsonDeserialize
    private List<KodikTitleDataDto> results;
}
