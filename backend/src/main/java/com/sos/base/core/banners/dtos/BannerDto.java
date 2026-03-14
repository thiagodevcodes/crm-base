package com.sos.base.core.banners.dtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BannerDto {
   private UUID bannerId;
   private String name;
   private String key;
   private String type;
   private String url;
   private Long size;
}