package com.a1tSign.shikiadapter.service.titlelist;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleListTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;

import java.util.List;

public interface TitleListService {

    TitleListTo findParticularTitleListOfUser(String username, String name);

    List<TitleListTo> findAllByUsername(String username);

    Boolean addTitle(TitleTo title, String username, String titleListName);

    Boolean removeTitleFromList(TitleTo title, String list, String username);
}
