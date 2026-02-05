package com.sos.base.core.roles;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sos.base.core.permissions.PermissionRepository;
import com.sos.base.core.roles.dtos.CreateRoleRequest;
import com.sos.base.core.roles.dtos.UpdateRoleRequest;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {
   @Autowired
   private RoleRepository roleRepository;

   @Autowired
   private PermissionRepository permissionRepository;

   public List<RoleEntity> findAll() {
      return roleRepository.findAll();
   }

   public RoleEntity create(CreateRoleRequest dto) {
      var permissions = permissionRepository.findByNameIn(dto.permissions());

      RoleEntity role = new RoleEntity();

      role.setName(dto.name());
      role.setPermissions(permissions);

      return roleRepository.save(role);
   }

   public RoleEntity update(UUID id, UpdateRoleRequest dto) {
      var permissions = permissionRepository.findByNameIn(dto.permissions());

      RoleEntity role = roleRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Role não encontrada"));

      role.setName(dto.name());
      role.setPermissions(permissions);

      return roleRepository.save(role);
   }

   public void delete(UUID id) {
      RoleEntity role = roleRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Role não encontrada"));

      try {
         roleRepository.delete(role);
      } catch (RuntimeException ex) {
         throw new ViolatedForeignKeyException(
               "Não é possível deletar porque existem recursos associadas.", ex);
      }
   }

}