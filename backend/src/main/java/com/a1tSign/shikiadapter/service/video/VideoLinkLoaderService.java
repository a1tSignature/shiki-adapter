package com.a1tSign.shikiadapter.service.video;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.contracts.dto.to.VideoLinkTo;

import java.util.List;
import java.util.Map;

public interface VideoLinkLoaderService {
    Map<String, List<VideoLinkTo>> loadVideoLink(TitleTo title, String source);
}
