package com.sos.base.core.permissions;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sos.base.core.permissions.dtos.CreatePermissionRequest;
import com.sos.base.core.permissions.dtos.UpdatePermissionRequest;
import com.sos.base.shared.exceptions.DataIntegrityException;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionService {
   @Autowired
   private PermissionRepository permissionRepository;

   @Autowired
   private ModelMapper modelMapper;

   public List<PermissionEntity> findAll() {
      return permissionRepository.findAll();
   }

   public PermissionEntity create(CreatePermissionRequest dto) {
      PermissionEntity permission = new PermissionEntity();

      permission.setName(dto.name());

      return permissionRepository.save(permission);
   }

   public PermissionEntity update(UUID id, UpdatePermissionRequest dto) {
      try {

         PermissionEntity permission = permissionRepository.findById(id)
               .orElseThrow(() -> new NotFoundException("Permissão não encontrada"));

         if (permissionRepository.findByName(dto.name()).isPresent())
            throw new DataIntegrityException("Permissão já cadastrada");

         modelMapper.map(dto, permission);

         return permissionRepository.save(permission);
      } catch (DataIntegrityViolationException ex) {
         throw new DataIntegrityException("Erro ao atualizar permissão");
      }

   }

   public void delete(UUID id) {
      try {
         PermissionEntity permission = permissionRepository.findById(id)
               .orElseThrow(() -> new NotFoundException("Permissão não encontrada"));

         permissionRepository.delete(permission);
      } catch (DataIntegrityViolationException ex) {
         throw new ViolatedForeignKeyException(
               "Erro ao deletar permissão");
      }
   }

}
