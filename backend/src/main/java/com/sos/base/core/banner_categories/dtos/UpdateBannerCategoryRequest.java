package com.sos.base.core.banner_categories.dtos;

import jakarta.validation.constraints.NotBlank;

public record UpdateBannerCategoryRequest(
    @NotBlank(message = "Nome da role é obrigatório") String title,
    Long width,
    Long height) {
}