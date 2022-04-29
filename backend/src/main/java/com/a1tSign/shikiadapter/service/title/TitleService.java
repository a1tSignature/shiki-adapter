package com.a1tSign.shikiadapter.service.title;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import org.springframework.stereotype.Service;

import java.util.List;

public interface TitleService {

    /**
     * Find the title by his name.
     * @param name name of title
     *
     * @return to-model of title
     */
    TitleTo findByName(String name);

    /**
     * Search all titles, including some string in their name.
     *
     * @param name query string
     *
     * @return list of titles
     */
    List<TitleTo> searchAllByName(String name);

    /**
     * Update information of title.
     *
     * @param titleTo title-to model
     * @return updated title-to model.
     */
    TitleTo updateTitle(TitleTo titleTo);


}
