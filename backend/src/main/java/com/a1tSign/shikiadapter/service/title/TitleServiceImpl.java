package com.a1tSign.shikiadapter.service.title;

import com.a1tSign.shikiadapter.contracts.api.ShikimoriV1Api;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.contracts.dto.to.VideoLinkTo;
import com.a1tSign.shikiadapter.repository.TitleRepository;
import com.a1tSign.shikiadapter.service.video.VideoLinkLoaderService;
import com.a1tSign.shikiadapter.util.Mapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.a1tSign.shikiadapter.util.Mapper.fromTitleEntity;
import static com.a1tSign.shikiadapter.util.Mapper.toTitleEntity;

@Service
@RequiredArgsConstructor
@Slf4j
public class TitleServiceImpl implements TitleService{

    private final TitleRepository titleRepository;
    private final VideoLinkLoaderService videoLinkLoaderService;
    private final ShikimoriV1Api shikimoriV1Api;

    @Value("${api.default}")
    private String source;

    @Override
    public TitleTo findByName(String name) {
        return null;
    }

    //TODO:: add dynamic loading of title-content
    @Override
    public Map<String, List<VideoLinkTo>> findByShikimoriId(TitleTo title) {
        var entity = titleRepository.findByShikimoriId(title.getShikimoriId());

//        if (entity.isPresent()) {
//            return fromTitleEntity(entity.get());
//        } else {
            var link = videoLinkLoaderService.loadVideoLink(title, source);
//            title.setContent(link);
            return link;
//        }
    }

    @Override
    public List<TitleTo> searchAllByName(String name) {
        var titles = titleRepository.searchAllByName(name);
        return titles.isEmpty() ? Collections.emptyList()
                : titles.stream().map(Mapper::fromTitleEntity).collect(Collectors.toList());
    }

    //TODO: need to use custom adapter for receiving video-content, mocked
    @Override
    public TitleTo updateTitle(TitleTo titleTo) {

        var title = titleRepository.findByName(titleTo.getName());

        if (title.isPresent()) {
            title.get().setContent(titleTo.getContent());
        } else {
            var titleEntity = toTitleEntity(titleTo);
            titleRepository.save(titleEntity);
        }

        return titleTo;
    }
}
