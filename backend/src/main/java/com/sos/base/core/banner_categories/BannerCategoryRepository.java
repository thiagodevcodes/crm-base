package com.sos.base.core.banner_categories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerCategoryRepository extends JpaRepository<BannerCategoryEntity, UUID> {
}
