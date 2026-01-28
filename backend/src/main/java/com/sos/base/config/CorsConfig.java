package com.sos.base.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

   @Bean
   public CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration config = new CorsConfiguration();

      config.setAllowCredentials(true); // necessário para enviar HttpOnly cookies
      config.setAllowedOrigins(List.of("http://localhost:3000")); // seu front
      config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
      config.setAllowedHeaders(List.of("*"));
      config.setExposedHeaders(List.of("Authorization"));

      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", config);

      return source;
   }
}
