package com.sos.base.controllers;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sos.base.controllers.dto.LoginRequest;
import com.sos.base.entities.Role;
import com.sos.base.repositories.UserRepository;
import com.sos.base.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class TokenController {
    private final JwtEncoder jwtEncoder;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public TokenController(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        var user = userRepository.findByUsername(loginRequest.username());

        if (user.isEmpty() || !user.get().isLoginCorrect(loginRequest, passwordEncoder)) {
            throw new BadCredentialsException("user or password is invalid!");
        }

        var now = Instant.now();
        var expiresIn = 300L; // 5 minutos

        var scopes = user.get().getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.joining(" "));

        var claims = JwtClaimsSet.builder()
                .issuer("mybackend")
                .subject(user.get().getUserId().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .claim("scope", scopes)
                .build();

        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        // 👉 Criar cookie HttpOnly
        ResponseCookie cookie = ResponseCookie.from("token", jwtValue)
                .httpOnly(true)
                .secure(false) // deixe false no DEV, true em produção com HTTPS
                .sameSite("Lax") // mais simples para começar
                .path("/") // cookie enviado em todas as rotas
                .maxAge(expiresIn)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("accessToken", jwtValue, "expiresIn", expiresIn));
    }

    @GetMapping("/auth/me")
    public ResponseEntity<?> me(HttpServletRequest req) {
        var jwt = authService.getJwtFromRequest(req); // injete AuthService no controller

        if (jwt.getTokenValue() == null)
            return ResponseEntity.status(401).build();

        return ResponseEntity.ok(Map.of(
                "id", jwt.getSubject(),
                "claims", jwt.getClaims()));
    }

    @PostMapping("/sign_out")
    public ResponseEntity<?> logout() {
        System.out.println("ENTREI NESSE CARALHO AQUI");
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
