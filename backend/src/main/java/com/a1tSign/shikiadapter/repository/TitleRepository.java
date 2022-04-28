package com.a1tSign.shikiadapter.repository;

import com.a1tSign.shikiadapter.entity.TitleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TitleRepository extends JpaRepository<TitleEntity, UUID> {
}
