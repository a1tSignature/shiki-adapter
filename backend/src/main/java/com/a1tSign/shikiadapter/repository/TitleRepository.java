package com.a1tSign.shikiadapter.repository;

import com.a1tSign.shikiadapter.entity.TitleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TitleRepository extends JpaRepository<TitleEntity, UUID> {

    /**
     * Find title by his name.
     *
     * @param name name of title
     * @return entity of title
     */
    Optional<TitleEntity> findByName(String name);

    /**
     * Search all titles including some string.
     *
     * @param name query string
     * @return list of titles
     */
    @Query(value = "FROM TitleEntity WHERE name LIKE :name")
    List<TitleEntity> searchAllByName(String name);
}
