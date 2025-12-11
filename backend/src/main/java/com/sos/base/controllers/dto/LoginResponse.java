package com.sos.base.controllers.dto;

import java.util.Set;

import org.springframework.http.ResponseCookie;

import com.sos.base.entities.Role;

public record LoginResponse(String accessToken, ResponseCookie cookie, Long expiresIn, String username, String name, Set<Role> roles) {
    
}