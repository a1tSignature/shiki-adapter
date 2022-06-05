package com.a1tSign.shikiadapter.service.video.usecase;

import com.a1tSign.shikiadapter.contracts.api.KodikApi;
import com.a1tSign.shikiadapter.contracts.dto.from.kodik.KodikSeasonsDataDto;
import com.a1tSign.shikiadapter.contracts.dto.from.kodik.KodikTitleDataDto;
import com.a1tSign.shikiadapter.contracts.dto.from.kodik.TranslationFrom;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.contracts.dto.to.VideoLinkTo;
import com.a1tSign.shikiadapter.contracts.enums.kodik.TranslationType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class KodikFetcherUseCase {

    private final KodikApi kodikApi;
    @Value("${api.kodik-api.token}")
    private String kodikToken;
    @Value("${api.kodik-api.blocked-regions}")
    private List<String> blockedRegions;

    private Map<String, List<VideoLinkTo>> getLinkByShikimoriId(String token, Integer id, String translationType,
                                                                Boolean isCamrip) {
        var data = kodikApi.getAnimesByShikimoriId(token, id, translationType,
                isCamrip, String.join(",", blockedRegions)).getResults();

        var voices = data.stream().map(KodikTitleDataDto::getTranslation)
                .map(TranslationFrom::getTitle).collect(Collectors.toList());
        var d = data.stream().map(KodikTitleDataDto::getSeasons).collect(Collectors.toList())
                .stream().flatMap(s -> s.values().stream().map(KodikSeasonsDataDto::getEpisodes))
                .collect(Collectors.toList()).stream().flatMap(s -> s.entrySet().stream().map(r -> new VideoLinkTo(r.getKey(), r.getValue(), "")))
                .collect(Collectors.groupingBy(VideoLinkTo::getNumber));
        d.values().forEach(s -> {
            AtomicInteger count = new AtomicInteger(0);
            s.forEach(p -> p.setSource(voices.get(count.getAndIncrement())));
        });

        return d;
    }

    public Map<String, List<VideoLinkTo>> getVideoLink(TitleTo title) {

        return getLinkByShikimoriId(kodikToken, title.getShikimoriId(), TranslationType.VOICE.getName(),
                false);
    }
}
