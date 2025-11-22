package com.sos.base.controllers.dto;

import java.util.Set;

import com.sos.base.entities.Role;

public record LoginResponse(String accessToken, Long expiresIn, String username, String name, Set<Role> roles) {
    
}