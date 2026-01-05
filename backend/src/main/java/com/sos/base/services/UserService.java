package com.sos.base.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sos.base.controllers.dto.CreateUserRequest;
import com.sos.base.controllers.dto.LoginRequest;
import com.sos.base.controllers.dto.UpdatePasswordRequest;
import com.sos.base.controllers.dto.UpdateUserRequest;
import com.sos.base.entities.User;
import com.sos.base.repositories.RoleRepository;
import com.sos.base.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User create(CreateUserRequest dto) {
        var roles = roleRepository.findByNameIn(dto.roles()); 

        User user = new User();
        user.setName(dto.name());
        user.setUsername(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setRoles(roles);

        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User update(UUID id, UpdateUserRequest dto) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        var roles = roleRepository.findByNameIn(dto.roles()); 

        user.setName(dto.name());
        user.setUsername(dto.username());
        user.setRoles(roles);

        return userRepository.save(user);
    }

    public User updatePassword(UUID id, UpdatePasswordRequest dto) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        user.setPassword(passwordEncoder.encode(dto.password()));
        userRepository.save(user);

        return userRepository.save(user);
    }

    public void delete(UUID id) {
        userRepository.deleteById(id);
    }

    public User login(LoginRequest dto) {
        User user = userRepository.findByUsername(dto.username())
            .orElseThrow(() -> new RuntimeException("Usuário inválido"));

        if (!user.getPassword().equals(dto.password())) {
            throw new RuntimeException("Senha inválida");
        }

        return user;
    }
}