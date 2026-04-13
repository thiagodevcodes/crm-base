package com.sos.base.core.banners;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends JpaRepository<BannerEntity, UUID> {
    List<BannerEntity> findByBannerCategory_BannerCategoryId(UUID bannerCategoryId);
}
