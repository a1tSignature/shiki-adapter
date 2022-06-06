package com.a1tSign.shikiadapter.service.titlelist;

import com.a1tSign.shikiadapter.contracts.api.ShikimoriV1Api;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleListTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.contracts.enums.TitleStatus;
import com.a1tSign.shikiadapter.contracts.enums.TitleType;
import com.a1tSign.shikiadapter.contracts.exception.ShikiAdapterException;
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

    @Override
    @SneakyThrows
    public TitleListTo findParticularTitleListOfUser(String username, String name) {
        var list = titleListRepository.findByUsernameAndName(username, name);
        if (list.isEmpty()) {
            var a = new TitleListEntity(UUID.randomUUID(), name, username, new HashSet<>());
            titleListRepository.save(a);
            return Mapper.fromTitleListEntity(a);
        }

        return Mapper.fromTitleListEntity(list.get());
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
        var list = titleListRepository.findByUsernameAndName(username, titleListName);
        TitleListEntity unpackedList;
        if (list.isEmpty()) {
            unpackedList = new TitleListEntity(UUID.randomUUID(), titleListName, username, new HashSet<>());
        } else {
            unpackedList = list.get();
        }

        var titleEntity = titleRepository.findByShikimoriId(title.getShikimoriId());
        TitleEntity unpackedEntity;
        if (titleEntity.isEmpty()) {
            unpackedEntity = Mapper.toTitleEntity(title);
            titleRepository.save(unpackedEntity);
        } else {
            unpackedEntity = titleEntity.get();
        }

        unpackedList.getTitles().add(unpackedEntity);
        titleListRepository.save(unpackedList);

        return true;
    }

    @Override
    public Boolean removeTitleFromList(TitleTo title, String titleListName, String username) {
        var list = titleListRepository.findByUsernameAndName(username, titleListName);
        if (list.isEmpty()) {
            throw new ShikiAdapterException("Title list was not found", "TITLE_LIST_WAS_NOT_FOUND");
        }

        var updatedTitles =  list.get().getTitles().removeIf(s -> Objects.equals(s.getShikimoriId(), title.getShikimoriId()));
        titleListRepository.save(list.get());

        return updatedTitles;
    }
}
