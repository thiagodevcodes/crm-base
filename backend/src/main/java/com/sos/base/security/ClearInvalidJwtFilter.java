package com.sos.base.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sos.base.shared.web.CookieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;

import java.io.IOException;

@Component
@AllArgsConstructor
public class ClearInvalidJwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private CookieService cookieService;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();
        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        Boolean tokenInvalido = false;

        if (token != null && !request.getRequestURI().equals("/auth/sign_in")) {
            try {
                jwtDecoder.decode(token);
            } catch (JwtException e) {
                tokenInvalido = true;
            }
        }

        if (tokenInvalido) {
            Cookie cookie = cookieService.clearCookie("token");
            
            response.addCookie(cookie);
        }

        filterChain.doFilter(request, response);
    }
}