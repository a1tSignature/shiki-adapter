package com.a1tSign.shikiadapter.util;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleListTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.entity.TitleEntity;
import com.a1tSign.shikiadapter.entity.TitleListEntity;

import java.util.stream.Collectors;

public class Mapper {

    public static TitleTo fromTitleEntity(TitleEntity entity) {
        return new TitleTo()
                .setName(entity.getName())
                .setOriginalImageLink(entity.getOriginalImageLink())
                .setContent(entity.getContent())
                .setKind(entity.getKind().getValue())
                .setStatus(entity.getStatus().getName());
    }

    public static TitleListTo fromTitleListEntity(TitleListEntity entity) {
        return new TitleListTo()
                .setName(entity.getName())
                .setTitles(entity.getTitles().stream().map(Mapper::fromTitleEntity).collect(Collectors.toList()));
    }
}
