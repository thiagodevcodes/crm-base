package com.sos.base.core.roles;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sos.base.core.permissions.PermissionRepository;
import com.sos.base.core.roles.dtos.CreateRoleRequest;
import com.sos.base.core.roles.dtos.UpdateRoleRequest;
import com.sos.base.shared.exceptions.BusinessRuleException;
import com.sos.base.shared.exceptions.DataIntegrityException;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {
   @Autowired
   private RoleRepository roleRepository;

   @Autowired
   private ModelMapper modelMapper;

   @Autowired
   private PermissionRepository permissionRepository;

   public List<RoleEntity> findAll() {
      return roleRepository.findAll();
   }

   public RoleEntity create(CreateRoleRequest dto) {
      try {
         var permissions = permissionRepository.findByNameIn(dto.permissions());

         if (roleRepository.findByName(dto.name()).isPresent()) {
            throw new DataIntegrityException("Role já cadastrada");
         }

         RoleEntity role = modelMapper.map(dto, RoleEntity.class);

         role.setPermissions(permissions);

         return roleRepository.save(role);
      } catch (DataIntegrityViolationException ex) {
         throw new DataIntegrityException("Erro ao cadastrar role");
      }

   }

   public RoleEntity update(UUID id, UpdateRoleRequest dto) {
      try {
         var permissions = permissionRepository.findByNameIn(dto.permissions());

         RoleEntity role = roleRepository.findById(id)
               .orElseThrow(() -> new NotFoundException("Role não encontrada"));

         if (!permissions.isEmpty() && permissions.size() != dto.permissions().size())
            throw new BusinessRuleException("Uma ou mais permissões informadas não existem");

         if (!permissions.isEmpty())
            role.setPermissions(permissions);

         modelMapper.map(dto, role);

         return roleRepository.save(role);
      } catch (DataIntegrityViolationException ex) {
         throw new DataIntegrityException("Erro ao atualizar role");
      }

   }

   public void delete(UUID id) {
      try {
         RoleEntity role = roleRepository.findById(id)
               .orElseThrow(() -> new NotFoundException("Role não encontrada"));

         roleRepository.delete(role);
      } catch (DataIntegrityViolationException ex) {
         throw new ViolatedForeignKeyException(
               "Erro ao deletar role");
      }
   }

}