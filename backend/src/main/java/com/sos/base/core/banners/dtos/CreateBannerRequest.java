package com.sos.base.core.banners.dtos;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateBannerRequest {
    String bannerCategoryId;
    List<MultipartFile> files;
}