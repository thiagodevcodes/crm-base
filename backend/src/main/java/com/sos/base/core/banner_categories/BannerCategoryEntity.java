package com.sos.base.core.banner_categories;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "tb_banner_categories")
public class BannerCategoryEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   private UUID bannerCategoryId;

   private String title;

   private Long width;

   private Long height;
}
