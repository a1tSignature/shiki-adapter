package com.a1tSign.shikiadapter.service.importer;

import com.a1tSign.shikiadapter.contracts.enums.TitleStatus;
import com.a1tSign.shikiadapter.entity.TitleEntity;
import com.a1tSign.shikiadapter.repository.TitleRepository;
import com.a1tSign.shikiadapter.service.video.VideoLinkLoaderService;
import com.a1tSign.shikiadapter.util.Mapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Scheduled video-link importer.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class VideoLinkImporter {

    private final TitleRepository titleRepository;
    private final VideoLinkLoaderService videoLinkLoaderService;

    @Value("${api.default}")
    private String source;

    @Scheduled(fixedDelay = 3600000)
    public void importVideoLinks() {
        log.info("Started scheduled task");
        List<TitleEntity> titles = titleRepository.findAllByStatus(TitleStatus.ONGOING);
        titleRepository.saveAll(titles.stream()
                .peek(System.out::println)
                .map(s -> s.setContent(videoLinkLoaderService
                        .loadVideoLink(Mapper.fromTitleEntity(s), source)))
                .collect(Collectors.toList()));
        log.info("Finished scheduled task");
    }
}
