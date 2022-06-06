package com.a1tSign.shikiadapter.contracts.dto.to;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SeriesTo {
    private Integer number;
    private List<VideoLinkTo> links;
}
