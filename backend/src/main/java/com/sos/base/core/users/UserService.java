package com.sos.base.core.users;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sos.base.core.roles.RoleRepository;
import com.sos.base.core.users.dtos.CreateUserRequest;
import com.sos.base.core.users.dtos.UpdatePasswordRequest;
import com.sos.base.core.users.dtos.UpdateUserRequest;
import com.sos.base.shared.exceptions.DataIntegrityException;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

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

   public UserEntity create(CreateUserRequest dto) {
      var roles = roleRepository.findByNameIn(dto.roles());

      if (userRepository.findByUsername(dto.username()).isPresent()) {
         throw new DataIntegrityException("Usuário já cadastrado");
      }

      UserEntity user = new UserEntity();
      user.setName(dto.name());
      user.setUsername(dto.username());
      user.setPassword(passwordEncoder.encode(dto.password()));
      user.setRoles(roles);

      return userRepository.save(user);
   }

   public List<UserEntity> findAll() {
      return userRepository.findAll();
   }

   public UserEntity update(UUID id, UpdateUserRequest dto) {
      UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

      var roles = roleRepository.findByNameIn(dto.roles());

      user.setName(dto.name());
      user.setUsername(dto.username());
      user.setRoles(roles);

      return userRepository.save(user);
   }

   public UserEntity updatePassword(UUID id, UpdatePasswordRequest dto) {
      UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

      user.setPassword(passwordEncoder.encode(dto.password()));
      userRepository.save(user);

      return userRepository.save(user);
   }

   public void delete(UUID id) {
      UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

      try {
         userRepository.delete(user);
      } catch (RuntimeException ex) {
         throw new ViolatedForeignKeyException(
               "Não é possível deletar porque existem recursos associados a esse usuário.", ex);
      }
   }
}