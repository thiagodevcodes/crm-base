package com.sos.base.auth.dtos;

import java.util.List;

public record GetMeResponse(String name, String username, List<String> roles, List<String> permissions) {
    
}