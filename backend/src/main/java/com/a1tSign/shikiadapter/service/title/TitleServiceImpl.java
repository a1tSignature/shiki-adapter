package com.a1tSign.shikiadapter.service.title;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.repository.TitleRepository;
import com.a1tSign.shikiadapter.util.Mapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.a1tSign.shikiadapter.util.Mapper.fromTitleEntity;

@Service
@RequiredArgsConstructor
@Slf4j
public class TitleServiceImpl implements TitleService{

    private final TitleRepository titleRepository;


    @Override
    public TitleTo findByName(String name) {
        return fromTitleEntity(titleRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Title not found")));
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
        var title = titleRepository.findByName(titleTo.getName())
                .orElseThrow(() -> new RuntimeException("Title not found"));

        title.setContent(titleTo.getContent());

        return titleTo;
    }
}
