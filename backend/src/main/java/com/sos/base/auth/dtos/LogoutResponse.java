package com.sos.base.auth.dtos;

import org.springframework.http.ResponseCookie;


public record LogoutResponse(ResponseCookie token, String message) {
    
}