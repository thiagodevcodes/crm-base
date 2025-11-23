package com.sos.base.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final JwtDecoder jwtDecoder;
    private final String cookieName = "token"; // o nome do cookie HttpOnly que você envia no login

    public AuthService(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    public Jwt getJwtFromRequest(HttpServletRequest req) {
        System.out.println(req);
        
        if (req.getCookies() == null) return null;

        for (Cookie c : req.getCookies()) {
            if (cookieName.equals(c.getName())) {
                try {
                    return jwtDecoder.decode(c.getValue());
                } catch (Exception e) {
                    return null; // inválido ou expirado
                }
            }
        }
        return null;
    }

    public String getUserIdFromRequest(HttpServletRequest req) {
        Jwt jwt = getJwtFromRequest(req);
        return jwt == null ? null : jwt.getSubject();
    }
}