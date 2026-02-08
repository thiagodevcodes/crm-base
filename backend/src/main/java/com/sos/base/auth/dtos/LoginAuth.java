package com.sos.base.auth.dtos;

import java.util.Set;

import org.springframework.http.ResponseCookie;

public record LoginAuth(String accessToken, ResponseCookie cookie, Long expiresIn, String username, String name,
      Set<String> roles, Set<String> permissions) {

}