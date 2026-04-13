package com.sos.base.core.banner_categories.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateBannerCategoryRequest(
    @NotBlank(message = "Nome da role é obrigatório") String title,
    @NotBlank(message = "Nome da role é obrigatório") String width,
    @NotBlank(message = "Nome da role é obrigatório") String height) {
}