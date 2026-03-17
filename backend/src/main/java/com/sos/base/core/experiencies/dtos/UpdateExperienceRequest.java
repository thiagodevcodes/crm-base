package com.sos.base.core.experiencies.dtos;

import jakarta.validation.constraints.NotBlank;

public record UpdateExperienceRequest(
    @NotBlank(message = "Nome da role é obrigatório") String title,
    @NotBlank(message = "Nome da role é obrigatório") String description,
    @NotBlank(message = "Nome da role é obrigatório") String period,
    @NotBlank(message = "Nome da role é obrigatório") String technologies) {
}