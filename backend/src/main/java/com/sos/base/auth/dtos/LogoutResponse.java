package com.sos.base.auth.dtos;

import jakarta.servlet.http.Cookie;


public record LogoutResponse(Cookie token, String message) {
    
}