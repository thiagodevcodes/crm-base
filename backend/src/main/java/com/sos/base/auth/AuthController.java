package com.sos.base.auth;

import com.sos.base.auth.dtos.GetMeResponse;
import com.sos.base.auth.dtos.LoginAuth;
import com.sos.base.auth.dtos.LoginRequest;
import com.sos.base.auth.dtos.LoginResponse;
import com.sos.base.auth.dtos.LogoutAuth;
import com.sos.base.auth.dtos.LogoutResponse;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
   @Autowired
   private AuthService authService;

   @PostMapping("/sign_in")
   public ResponseEntity<LoginResponse> login(
         @RequestBody LoginRequest loginRequest, HttpServletResponse response) {

      LoginAuth authResponse = authService.login(loginRequest);
      LoginResponse login = new LoginResponse(authResponse.accessToken(), authResponse.expiresIn(),
            authResponse.username(),
            authResponse.name());

      return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, authResponse.cookie().toString()).body(login);
   }

   @GetMapping("/me")
   @PreAuthorize("@auth.isSelf(authentication)")
   public ResponseEntity<GetMeResponse> me(
         @CookieValue(name = "token", required = false) String token, HttpServletResponse response) {

      GetMeResponse getMeResponse = authService.getMe(token, response);

      return ResponseEntity.status(HttpStatus.OK).body(getMeResponse);
   }

   @PostMapping("/sign_out")
   @PreAuthorize("@auth.isSelf(authentication)")
   public ResponseEntity<LogoutResponse> logout() {

      LogoutAuth logoutAuth = authService.logout();
      LogoutResponse logoutResponse = new LogoutResponse(logoutAuth.message());

      return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, logoutAuth.cookie().toString())
            .body(logoutResponse);
   }
}
