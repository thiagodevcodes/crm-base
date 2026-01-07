package com.sos.base.auth.dtos;

import java.util.List;
import java.util.UUID;

public record GetMeResponse(UUID userId, String name, String username, List<String> roles, List<String> permissions) {
    
}