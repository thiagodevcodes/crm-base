package com.sos.base.core.images.dtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageDto {
   private UUID imageId;
   private String name;
   private String key;
   private String type;
   private String url;
   private Long size;
}