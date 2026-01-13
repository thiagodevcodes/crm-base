package com.sos.base.auth;

import com.sos.base.auth.dtos.GetMeResponse;
import com.sos.base.auth.dtos.LoginRequest;
import com.sos.base.auth.dtos.LoginResponse;
import com.sos.base.auth.dtos.LogoutResponse;
import com.sos.base.core.users.dtos.UserDto;
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

      LoginResponse login = authService.login(loginRequest);

      LoginResponse dto = new LoginResponse(
            login.accessToken(),
            login.cookie(),
            login.expiresIn(),
            login.username(),
            login.name(),
            login.roles(),
            login.permissions());

      return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, login.cookie().toString()).body(dto);
   }

   @GetMapping("/me")
   @PreAuthorize("@auth.isSelf(authentication)")
   public ResponseEntity<GetMeResponse> me(
         @CookieValue(name = "token", required = false) String token, HttpServletResponse response) {

      UserDto userDto = authService.getMe(token, response);

      return ResponseEntity.status(HttpStatus.OK)
            .body(
                  new GetMeResponse(
                        userDto.user().getUserId(),
                        userDto.user().getName(),
                        userDto.user().getUsername(),
                        userDto.roles(),
                        userDto.permissions()));
   }

   @PostMapping("/sign_out")
   @PreAuthorize("@auth.isSelf(authentication)")
   public ResponseEntity<LogoutResponse> logout() {

      LogoutResponse logoutResponse = authService.logout();

      return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, logoutResponse.token().toString())
            .body(logoutResponse);
   }
}
