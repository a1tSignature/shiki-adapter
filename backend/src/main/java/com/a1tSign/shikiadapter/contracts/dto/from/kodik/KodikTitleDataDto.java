package com.a1tSign.shikiadapter.contracts.dto.from.kodik;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * Title data class.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KodikTitleDataDto {
    private String id;

    private String type;

    @JsonProperty ("title_orig")
    private String titleOriginalName;

    @JsonProperty ("title")
    private String titleName;

    @JsonProperty ("shikimori_id")
    private Long shikimoriId;

    /**
     * Video link.
     */
    private String link;

    /**
     * Quality of video.
     */
    private String quality;

    @JsonProperty ("created_at")
    private Instant createdAt;

    @JsonProperty ("updated_at")
    private Instant updatedAt;

    @JsonProperty ("blocked_countries")
    private List<String> blockedCountries;

    @JsonProperty("seasons")
    private Map<String, KodikSeasonsDataDto> seasons;

    private TranslationFrom translation;

}