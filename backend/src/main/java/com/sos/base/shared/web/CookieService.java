package com.sos.base.shared.web;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;

@Service
public class CookieService {
   public ResponseCookie createCookie(String key, String value, Long expiresIn) {
      // 🔹 Criar cookie HTTP-only
      ResponseCookie cookie = ResponseCookie.from(key, value)
            .httpOnly(true)
            .secure(false) // DEV = false, produção = true
            .sameSite("Lax")
            .path("/")
            .maxAge(expiresIn)
            .build();

      return cookie;
   }

   public Cookie clearCookie(String key) {

      Cookie cookie = new Cookie("token", "");

      cookie.setHttpOnly(true);
      cookie.setPath("/");
      cookie.setMaxAge(0);
      cookie.setSecure(false);
      cookie.setAttribute("sameSite", "Lax");

      return cookie;
   }
}
