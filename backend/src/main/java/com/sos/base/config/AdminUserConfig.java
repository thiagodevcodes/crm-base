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
        var userTest = userRepository.findByUsername("teste@admin.com");
        var userThiago = userRepository.findByUsername("thiago@gmail.com");


        if(userTest != null) {
            userTest.ifPresentOrElse(
                (user) -> {
                    System.out.println("Teste já existe");
                },
                () -> {
                    var user = new User();
                    user.setUsername("teste@gmail.com");
                    user.setName("Teste");
                    user.setPassword(passwordEncoder.encode("123321123"));
                    user.setRoles(Set.of(roleAdmin));
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
                    user.setUsername("thiago@gmail.com");
                    user.setName("Thiago");
                    user.setPassword(passwordEncoder.encode("12345678"));
                    user.setRoles(Set.of(roleAdmin));
                    userRepository.save(user);
                });
        }

    }
}