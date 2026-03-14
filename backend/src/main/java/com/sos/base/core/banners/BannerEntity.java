package com.sos.base.core.banners;

import java.util.UUID;

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
}
