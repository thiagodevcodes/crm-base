package com.sos.base.core.users;

import java.util.Set;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.sos.base.auth.dtos.LoginRequest;
import com.sos.base.core.roles.RoleEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "tb_users")
public class UserEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   @Column(name = "user_id")
   private UUID userId;

   private String name;

   @Column(unique = true)
   private String username;

   private String password;

   @ManyToMany(fetch = FetchType.EAGER)
   @JoinTable(name = "tb_users_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))

   private Set<RoleEntity> roles;

   public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
      return passwordEncoder.matches(loginRequest.password(), this.password);
   }
}
