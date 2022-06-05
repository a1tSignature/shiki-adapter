package com.a1tSign.shikiadapter.service.titlelist;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleListTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.contracts.enums.TitleStatus;
import com.a1tSign.shikiadapter.contracts.enums.TitleType;
import com.a1tSign.shikiadapter.entity.TitleEntity;
import com.a1tSign.shikiadapter.entity.TitleListEntity;
import com.a1tSign.shikiadapter.repository.TitleListRepository;
import com.a1tSign.shikiadapter.repository.TitleRepository;
import com.a1tSign.shikiadapter.util.Mapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TitleListServiceImpl implements TitleListService {

    private final TitleListRepository titleListRepository;
    private final TitleRepository titleRepository;

    private static Set<TitleEntity> set;

    static {
        set = new HashSet<>();
        set.add(new TitleEntity(UUID.randomUUID(), "mock", "mock", new HashMap<>(),
                TitleType.SPECIAL, TitleStatus.ANONS, 2334));
    }

    @Override
    @SneakyThrows
    public TitleListTo findParticularTitleListOfUser(String username, String name) {
        var list = titleListRepository.findByUsernameAndName(username, name)
                .orElse(new TitleListEntity(UUID.randomUUID(), "mock-name", username, set));
//                .orElseThrow(() -> new ShikiAdapterException("Could not find the list of this name", "LIST_NOT_FOUND"));

        return Mapper.fromTitleListEntity(list);
    }

    @Override
    public List<TitleListTo> findAllByUsername(String username) {
        var lists =  titleListRepository.findAllByUsername(username);
        return lists.isEmpty() ? Collections.emptyList() : lists
                .stream().map(Mapper::fromTitleListEntity).collect(Collectors.toList());
    }

    @Override
    @SneakyThrows
    public Boolean addTitle(TitleTo title, String username, String titleListName) {
        var list = titleListRepository.findByUsernameAndName(username, titleListName)
                .orElse(new TitleListEntity(UUID.randomUUID(), "mock-name", username,
                        set));
//                .orElseThrow(() -> new RuntimeException("Could not find the list of this name"));

        var titleEntity = titleRepository.findByName(title.getName())
                .orElse(new TitleEntity(UUID.randomUUID(), "mock", "mock", new HashMap<>(),
                        TitleType.SPECIAL, TitleStatus.ANONS, 2334));
//                .orElseThrow(() -> new RuntimeException("Title not found"));

        list.getTitles().add(titleEntity);
//        titleListRepository.save(list);

        return true;
    }
}
