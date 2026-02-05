package com.sos.base.config;

import com.sos.base.core.permissions.PermissionEntity;
import com.sos.base.core.permissions.PermissionRepository;
import com.sos.base.core.roles.RoleEntity;
import com.sos.base.core.roles.RoleRepository;
import com.sos.base.core.users.UserEntity;
import com.sos.base.core.users.UserRepository;
import jakarta.transaction.Transactional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@DependsOn("rsaKeyInitializer") // 👈 GARANTE ORDEM
public class AdminUserConfig implements CommandLineRunner {
   @Autowired
   private RoleRepository roleRepository;

   @Autowired
   private PermissionRepository permissionRepository;

   @Autowired
   private UserRepository userRepository;

   @Autowired
   private BCryptPasswordEncoder passwordEncoder;

   @Override
   @Transactional
   public void run(String... args) throws Exception {
      // ROLES
      var roleAdmin = getOrCreateRole("ADMIN");
      var roleBasic = getOrCreateRole("BASIC");

      // PERMISSIONS
      var allAccess = getOrCreatePermission("ALL_ACCESS");
      var viewDashboard = getOrCreatePermission("VIEW_DASHBOARD");
      var getUsers = getOrCreatePermission("GET_USERS");

      // ROLE → PERMISSIONS
      roleAdmin.getPermissions().add(allAccess);

      roleBasic.getPermissions().addAll(Set.of(
            viewDashboard,
            getUsers));

      roleRepository.save(roleAdmin);
      roleRepository.save(roleBasic);

      // USERS
      userRepository.findByUsername("admin@test.com")
            .ifPresentOrElse(
                  user -> System.out.println("Admin já existe"),
                  () -> {
                     var user = new UserEntity();
                     user.setUsername("admin@test.com");
                     user.setName("Admin");
                     user.setPassword(passwordEncoder.encode("admin123"));
                     user.setRoles(Set.of(roleAdmin));
                     userRepository.save(user);
                     System.out.println("Admin criado com sucesso");
                  });

      userRepository.findByUsername("basic@test.com")
            .ifPresentOrElse(
                  user -> System.out.println("Basic já existe"),
                  () -> {
                     var user = new UserEntity();
                     user.setUsername("basic@test.com");
                     user.setName("Basic");
                     user.setPassword(passwordEncoder.encode("basic123"));
                     user.setRoles(Set.of(roleBasic));
                     userRepository.save(user);
                     System.out.println("Basic criado com sucesso");
                  });

   }

   private PermissionEntity getOrCreatePermission(String name) {
      return permissionRepository.findByName(name)
            .orElseGet(() -> {
               var permission = new PermissionEntity();
               permission.setName(name);
               return permissionRepository.save(permission);
            });
   }

   private RoleEntity getOrCreateRole(String name) {
      return roleRepository.findByName(name)
            .orElseGet(() -> {
               var role = new RoleEntity();
               role.setName(name);
               return roleRepository.save(role);
            });
   }
}
