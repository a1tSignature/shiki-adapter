package com.a1tSign.shikiadapter.service.titlelist;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleListTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.repository.TitleListRepository;
import com.a1tSign.shikiadapter.repository.TitleRepository;
import com.a1tSign.shikiadapter.util.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TitleListServiceImpl implements TitleListService {

    private final TitleListRepository titleListRepository;
    private final TitleRepository titleRepository;

    @Override
    public TitleListTo findParticularTitleListOfUser(String username, String name) {
        var list = titleListRepository.findByUsernameAndName(username, name)
                .orElseThrow(() -> new RuntimeException("Could not find the list of this name"));

        return Mapper.fromTitleListEntity(list);
    }

    @Override
    public List<TitleListTo> findAllByUsername(String username) {
        var lists =  titleListRepository.findAllByUsername(username);
        return lists.isEmpty() ? Collections.emptyList() : lists
                .stream().map(Mapper::fromTitleListEntity).collect(Collectors.toList());
    }

    @Override
    public Boolean addTitle(TitleTo title, String username, String titleListName) {
        var list = titleListRepository.findByUsernameAndName(username, titleListName)
                .orElseThrow(() -> new RuntimeException("Could not find the list of this name"));

        var titleEntity = titleRepository.findByName(title.getName())
                .orElseThrow(() -> new RuntimeException("Title not found"));

        list.getTitles().add(titleEntity);

        return true;
    }
}
