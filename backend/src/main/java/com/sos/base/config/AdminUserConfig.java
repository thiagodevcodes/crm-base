package com.sos.base.config;

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
   private UserRepository userRepository;

   @Autowired
   private BCryptPasswordEncoder passwordEncoder;

   @Override
   @Transactional
   public void run(String... args) throws Exception {
      var roleAdmin = roleRepository.findByName(RoleEntity.Values.ADMIN.name());
      var roleBasic = roleRepository.findByName(RoleEntity.Values.BASIC.name());

      var userBasic = userRepository.findByUsername("basic@test.com");
      var userAdmin = userRepository.findByUsername("admin@test.com");

      if (userAdmin != null) {
         userAdmin.ifPresentOrElse(
               (user) -> {
                  System.out.println("Admin já existe");
               },
               () -> {
                  var user = new UserEntity();
                  user.setUsername("admin@test.com");
                  user.setName("Admin");
                  user.setPassword(passwordEncoder.encode("admin123"));
                  user.setRoles(Set.of(roleAdmin));
                  userRepository.save(user);
                  System.out.println("Admin criado com sucesso");
               });
      }

      if (userBasic != null) {
         userBasic.ifPresentOrElse(
               (user) -> {
                  System.out.println("Basic já existe");
               },
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
   }
}
