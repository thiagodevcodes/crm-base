package com.sos.base.core.users;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sos.base.core.roles.RoleRepository;
import com.sos.base.core.users.dtos.CreateUserRequest;
import com.sos.base.core.users.dtos.UpdatePasswordRequest;
import com.sos.base.core.users.dtos.UpdateUserRequest;
import com.sos.base.shared.exceptions.BusinessRuleException;
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
   private ModelMapper modelMapper;

   @Autowired
   private UserRepository userRepository;

   @Autowired
   private BCryptPasswordEncoder passwordEncoder;

   public UserEntity create(CreateUserRequest dto) {
      var roles = roleRepository.findByNameIn(dto.roles());

      if (roles.isEmpty()) {
         throw new BusinessRuleException("Usuário deve possuir ao menos um papel válido");
      }

      if (roles.size() != dto.roles().size()) {
         throw new BusinessRuleException("Uma ou mais roles informadas não existem");
      }

      if (userRepository.findByUsername(dto.username()).isPresent()) {
         throw new DataIntegrityException("Usuário já cadastrado");
      }

      UserEntity user = modelMapper.map(dto, UserEntity.class);

      user.setRoles(roles);
      user.setPassword(passwordEncoder.encode(dto.password()));

      try {
         return userRepository.save(user);
      } catch (RuntimeException ex) {
         throw new DataIntegrityException("Erro ao cadastrar usuário", ex);
      }
   }

   public List<UserEntity> findAll() {
      return userRepository.findAll();
   }

   public UserEntity update(UUID id, UpdateUserRequest dto) {
      UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

      var roles = roleRepository.findByNameIn(dto.roles());

      if (!roles.isEmpty() && roles.size() != dto.roles().size())
         throw new BusinessRuleException("Uma ou mais roles informadas não existem");

      if (!roles.isEmpty())
         user.setRoles(roles);

      modelMapper.map(dto, user);

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
      if (!userRepository.existsById(id))
         throw new NotFoundException("Usuário não encontrado");

      try {
         userRepository.deleteById(id);
      } catch (RuntimeException ex) {
         throw new ViolatedForeignKeyException(
               "Não é possível deletar porque existem recursos associados a esse usuário.", ex);
      }
   }
}