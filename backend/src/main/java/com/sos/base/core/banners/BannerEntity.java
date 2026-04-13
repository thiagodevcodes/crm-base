package com.sos.base.core.banners;

import java.util.UUID;

import com.sos.base.core.banner_categories.BannerCategoryEntity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "tb_banners")
public class BannerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bannerId;

    private String key;

    private String name;

    private Long size;

    private String type;

    @ManyToOne
    @JoinColumn(name = "banner_category_id")
    private BannerCategoryEntity bannerCategory;

}
