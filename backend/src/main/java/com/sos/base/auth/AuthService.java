package com.sos.base.auth;

import com.sos.base.auth.dtos.LoginRequest;
import com.sos.base.auth.dtos.LoginResponse;
import com.sos.base.auth.dtos.LogoutResponse;
import com.sos.base.auth.exceptions.InvalidCredentialsException;
import com.sos.base.auth.exceptions.TokenInvalidException;
import com.sos.base.core.permissions.PermissionEntity;
import com.sos.base.core.roles.RoleEntity;
import com.sos.base.core.users.UserEntity;
import com.sos.base.core.users.UserRepository;
import com.sos.base.core.users.dtos.UserDto;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.web.CookieService;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
   @Autowired
   private UserRepository userRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   @Autowired
   private CookieService cookieService;

   @Autowired
   private JwtDecoder jwtDecoder;

   @Autowired
   private JwtEncoder jwtEncoder;

   public LoginResponse login(LoginRequest loginRequest) {
      var user = userRepository.findByUsername(loginRequest.username());

      if (user.isEmpty() || !user.get().isLoginCorrect(loginRequest, passwordEncoder)) {
         throw new InvalidCredentialsException("Usuário ou senha inválidos");
      }

      Instant now = Instant.now();
      Long expiresIn = 60L * 60L * 24L; // 1 dia

      Set<String> scopes = extractRoles(user.get());
      Set<String> permissions = extractPermissions(user.get().getRoles());

      var claims = JwtClaimsSet.builder()
            .issuer("mybackend")
            .subject(user.get().getUserId().toString())
            .issuedAt(now)
            .expiresAt(now.plusSeconds(expiresIn))
            .claim("scope", scopes)
            .claim("permissions", permissions)
            .build();

      var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

      // 🔹 Criar cookie HTTP-only
      ResponseCookie cookie = cookieService.createCookie("token", jwtValue, expiresIn);

      return new LoginResponse(
            jwtValue,
            cookie,
            expiresIn,
            user.get().getUsername(),
            user.get().getName(),
            scopes,
            permissions);
   }

   public LogoutResponse logout() {
      ResponseCookie cookie = cookieService.createCookie("token", "", 0L);

      return new LogoutResponse(cookie, "Loggout success");
   }

   public UserDto getMe(String token, HttpServletResponse response) {
      if (token == null || token.isEmpty())
         throw new TokenInvalidException("Token Inválido ou Inexistente");

      Jwt jwt = jwtDecoder.decode(token);

      UUID userId = UUID.fromString(jwt.getSubject());

      UserEntity user = userRepository
            .findById(userId)
            .orElseThrow(() -> new NotFoundException("user not found"));

      List<String> permissions = jwt.getClaimAsStringList("permissions");
      List<String> roles = jwt.getClaimAsStringList("scope");

      return new UserDto(user, roles, permissions);
   }

   public Set<String> extractPermissions(Set<RoleEntity> roles) {
      return roles.stream()
            .flatMap(role -> role.getPermissions().stream())
            .map(PermissionEntity::getName)
            .collect(Collectors.toSet());
   }

   public Set<String> extractRoles(UserEntity user) {
      return user.getRoles().stream().map(RoleEntity::getName).collect(Collectors.toSet());
   }
}
