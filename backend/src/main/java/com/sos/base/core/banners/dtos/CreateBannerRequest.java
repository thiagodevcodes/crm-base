package com.sos.base.core.banners.dtos;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateBannerRequest {
    @NotBlank(message = "Nome da role é obrigatório")
    String name;
    @NotBlank(message = "Nome da role é obrigatório")
    String type;
    @NotBlank(message = "Nome da role é obrigatório")
    String key;
    Long size;
    String categoryId;
    MultipartFile file;
}