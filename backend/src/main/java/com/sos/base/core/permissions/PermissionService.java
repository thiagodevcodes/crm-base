package com.sos.base.core.permissions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sos.base.core.permissions.dtos.CreatePermissionRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionService {
   @Autowired
   private PermissionRepository permissionRepository;

   public List<PermissionEntity> findAll() {
      return permissionRepository.findAll();
   }

   public PermissionEntity create(CreatePermissionRequest dto) {
      PermissionEntity permission = new PermissionEntity();

      permission.setName(dto.name());

      return permissionRepository.save(permission);
   }

}
