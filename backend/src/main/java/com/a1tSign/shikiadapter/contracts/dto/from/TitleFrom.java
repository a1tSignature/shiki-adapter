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
public class TitleFrom {
    private String name;
    private String russian;
    private String kind;
    private String status;
    @JsonProperty("shikimori_id")
    private String shikimoriId;
}
