package com.sos.base.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;

@Component("auth")
public class AuthorizationHelper {

    public boolean hasPermission(String permission) {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || auth.getAuthorities() == null) {
            return false;
        }

        return auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ALL_ACCESS") || a.equals(permission));
    }

    public boolean isSelf(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        // 🔥 ALL_ACCESS libera tudo
        boolean hasAllAccess = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ALL_ACCESS"));

        if (hasAllAccess) {
            return true;
        }

        // 👤 /me → sempre o próprio usuário
        return authentication.getName() != null;
    }
}