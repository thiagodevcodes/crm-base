package com.sos.base.config;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.sos.base.entities.Role;
import com.sos.base.entities.User;
import com.sos.base.repositories.RoleRepository;
import com.sos.base.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Configuration
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
        var roleAdmin = roleRepository.findByName(Role.Values.ADMIN.name()); 
        var roleBasic = roleRepository.findByName(Role.Values.BASIC.name()); 
        
        var userBasic = userRepository.findByUsername("basic@test.com");
        var userAdmin = userRepository.findByUsername("admin@test.com");
        var userThiago = userRepository.findByUsername("thiago@test.com");


        if(userAdmin != null) {
            userAdmin.ifPresentOrElse(
                (user) -> {
                    System.out.println("Admin já existe");
                },
                () -> {
                    var user = new User();
                    user.setUsername("admin@test.com");
                    user.setName("Admin");
                    user.setPassword(passwordEncoder.encode("admin123"));
                    user.setRoles(Set.of(roleAdmin));
                    userRepository.save(user);
                });
        }

                if(userBasic != null) {
            userBasic.ifPresentOrElse(
                (user) -> {
                    System.out.println("Basic já existe");
                },
                () -> {
                    var user = new User();
                    user.setUsername("basic@test.com");
                    user.setName("Basic");
                    user.setPassword(passwordEncoder.encode("basic123"));
                    user.setRoles(Set.of(roleBasic));
                    userRepository.save(user);
                });
        }

        if(userThiago != null) {
            userThiago.ifPresentOrElse(
                (user) -> {
                    System.out.println("Thiago já existe");
                },
                () -> {
                    var user = new User();
                    user.setUsername("thiago@test.com");
                    user.setName("Thiago");
                    user.setPassword(passwordEncoder.encode("12345678"));
                    user.setRoles(Set.of(roleAdmin, roleBasic));
                    userRepository.save(user);
                });
        }

    }
}