package com.a1tSign.shikiadapter.contracts.dto.from;

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

/**
 * Title data class.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
class KodikTitleDataDto {
    private String id;

    private String type;

    @JsonProperty("title_orig")
    private String titleOriginalName;

    @JsonProperty("title")
    private String titleName;

    @JsonProperty("shikimori_id")
    private Long shikimoriId;

    /**
     * Video link.
     */
    private String link;

    /**
     * Quality of video.
     */
    private String quality;

    @JsonProperty("created_at")
    private Instant createdAt;

    @JsonProperty("updated_at")
    private Instant updatedAt;

    @JsonProperty("blocked_countries")
    private List<String> blockedCountries;

    @JsonProperty("blocked_seasons")
    private List<String> blockedSeasons;
}
