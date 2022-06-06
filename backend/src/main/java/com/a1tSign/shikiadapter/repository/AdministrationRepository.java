package com.a1tSign.shikiadapter.repository;

import com.a1tSign.shikiadapter.entity.AdministrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AdministrationRepository extends JpaRepository<AdministrationEntity, UUID> {

    @Query(value = "FROM AdministrationEntity WHERE role = 'MODERATOR'")
    List<AdministrationEntity> findAllModerators();

    @Query(value = "DELETE FROM AdministrationEntity WHERE role = 'MODERATOR' and username = :name")
    AdministrationEntity deleteByName(String name);

}
