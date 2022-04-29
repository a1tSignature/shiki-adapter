package com.a1tSign.shikiadapter.repository;

import com.a1tSign.shikiadapter.entity.TitleListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TitleListRepository extends JpaRepository<TitleListEntity, UUID> {

    /**
     * Find particular title-list of user.
     *
     * @param username username
     * @param name name of the list of titles
     *
     * @return user's list of titles
     */
    Optional<TitleListEntity> findByUsernameAndName(String username, String name);

    /**
     * Find all user's lists
     *
     * @param username username
     *
     * @return List of user's lists
     */
    List<TitleListEntity> findAllByUsername(String username);
}
