package com.sos.base.core.banner_categories.dtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperiencieDto {
   private UUID bannerCategoryId;
   private String title;
   private String width;
   private String height;
}