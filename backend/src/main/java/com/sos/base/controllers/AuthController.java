package com.sos.base.controllers;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sos.base.controllers.dto.LoginRequest;
import com.sos.base.controllers.dto.LoginResponse;
import com.sos.base.services.AuthService;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/sign_in")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {

        LoginResponse response = authService.login(loginRequest);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, response.cookie().toString())
                .body(Map.of(
                        "accessToken", response.accessToken(),
                        "expiresIn", response.expiresIn()
                ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(Map.of(
            "authenticated", true,
            "user", authentication.getName()
        ));
    }

    @PostMapping("/sign_out")
    public ResponseEntity<Map<String, Object>> logout() {
        ResponseCookie cookie = ResponseCookie.from("token", "")
            .httpOnly(true)
            .secure(false) // true em produção
            .sameSite("Lax")
            .path("/")
            .maxAge(0)
            .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("message", "Logged out"));
    }

}
