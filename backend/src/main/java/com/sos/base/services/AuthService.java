package com.sos.base.services;

import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.sos.base.controllers.dto.LoginRequest;
import com.sos.base.controllers.dto.LoginResponse;
import com.sos.base.entities.Permission;
import com.sos.base.entities.Role;
import com.sos.base.entities.User;
import com.sos.base.repositories.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtEncoder jwtEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        var user = userRepository.findByUsername(loginRequest.username());

        if (user.isEmpty() || !user.get().isLoginCorrect(loginRequest, passwordEncoder)) {
            throw new BadCredentialsException("user or password is invalid!");
        }

        var now = Instant.now();
        long expiresIn = 60 * 60 * 24; // 86400

        Set<String> scopes = extractRoles(user.get());
        Set<String> permissions = extractPermissions(user.get().getRoles());

        System.out.println(permissions);

        var claims = JwtClaimsSet.builder()
                .issuer("mybackend")
                .subject(user.get().getUserId().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .claim("scope", scopes)
                .claim("permissions", permissions)
                .build();

        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        // montar cookie HttpOnly
        ResponseCookie cookie = ResponseCookie.from("token", jwtValue)
                .httpOnly(true)
                .secure(false) // DEV = false
                .sameSite("Lax")
                .path("/")
                .maxAge(expiresIn)
                .build();

        return new LoginResponse(jwtValue, cookie, expiresIn, user.get().getUsername(), user.get().getName(),
                user.get().getRoles());
    }

    public Set<String> extractPermissions(Set<Role> roles) {
        return roles.stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(Permission::getName)
                .collect(Collectors.toSet());
    }

    public Set<String> extractRoles(User user) {
        return user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
    }
}
