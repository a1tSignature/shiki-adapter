package com.a1tSign.shikiadapter.repository;

import com.a1tSign.shikiadapter.entity.TitleListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TitleListRepository extends JpaRepository<TitleListEntity, UUID> {
}
