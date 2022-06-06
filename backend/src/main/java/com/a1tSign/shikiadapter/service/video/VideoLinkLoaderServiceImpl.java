package com.a1tSign.shikiadapter.service.video;

import com.a1tSign.shikiadapter.contracts.api.KodikApi;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.contracts.dto.to.VideoLinkTo;
import com.a1tSign.shikiadapter.service.video.usecase.KodikFetcherUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class VideoLinkLoaderServiceImpl implements VideoLinkLoaderService {

    private final KodikFetcherUseCase kodikFetcherUseCase;

    public Map<String, List<VideoLinkTo>> loadVideoLink(TitleTo title, String source) {

        Map<String, List<VideoLinkTo>> links;

        switch (source) {
            case "another":
                links = new HashMap<>();
            default:
                links = kodikFetcherUseCase.getVideoLink(title);
        }


        return links;

    }
}
