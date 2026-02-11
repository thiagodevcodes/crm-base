package com.sos.base.core.users;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
      try {
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

         return userRepository.save(user);
      } catch (DataIntegrityViolationException ex) {
         throw new DataIntegrityException("Erro ao cadastrar usuário");
      }
   }

   public List<UserEntity> findAll() {
      return userRepository.findAll();
   }

   public UserEntity update(UUID id, UpdateUserRequest dto) {
      try {
         UserEntity user = userRepository.findById(id)
               .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

         var roles = roleRepository.findByNameIn(dto.roles());

         if (!roles.isEmpty() && roles.size() != dto.roles().size())
            throw new BusinessRuleException("Uma ou mais roles informadas não existem");

         if (!roles.isEmpty())
            user.setRoles(roles);

         modelMapper.map(dto, user);

         return userRepository.save(user);
      } catch (DataIntegrityViolationException ex) {
         throw new ViolatedForeignKeyException(
               "Não foi possível atualizar o usuário.");
      }

   }

   public UserEntity updatePassword(UUID id, UpdatePasswordRequest dto) {
      try {
         UserEntity user = userRepository.findById(id)
               .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

         user.setPassword(passwordEncoder.encode(dto.password()));
         userRepository.save(user);

         return userRepository.save(user);
      } catch (DataIntegrityViolationException ex) {
         throw new ViolatedForeignKeyException(
               "Não foi possível atualizar a senha do usuário.");
      }

   }

   public void delete(UUID id) {
      try {
         if (!userRepository.existsById(id))
            throw new NotFoundException("Usuário não encontrado");

         userRepository.deleteById(id);
      } catch (DataIntegrityViolationException ex) {
         throw new ViolatedForeignKeyException(
               "Não foi possível deletar esse usuário.");
      }
   }
}