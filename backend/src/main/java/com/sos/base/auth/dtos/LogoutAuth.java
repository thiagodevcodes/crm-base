package com.sos.base.auth.dtos;

import org.springframework.http.ResponseCookie;

public record LogoutAuth(ResponseCookie cookie, String message) {

}