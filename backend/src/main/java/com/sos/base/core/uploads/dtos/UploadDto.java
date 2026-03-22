package com.sos.base.core.uploads.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadDto {
   private String name;
   private String key;
   private Long size;
   private String type;
   private String url;
}