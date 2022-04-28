package com.a1tSign.shikiadapter.repository;

import com.a1tSign.shikiadapter.entity.AdministrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AdministrationRepository extends JpaRepository<AdministrationEntity, UUID> {
}
