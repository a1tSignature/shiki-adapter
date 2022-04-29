package com.a1tSign.shikiadapter.contracts.dto.to;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors (chain = true)
public class TitleTo {
    private String name;
    private String originalImageLink;
    private Map<String, List<String>> content;
    private String kind;
    private String status;
}
