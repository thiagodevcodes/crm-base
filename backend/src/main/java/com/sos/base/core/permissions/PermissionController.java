package com.sos.base.core.permissions;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sos.base.core.permissions.dtos.CreatePermissionRequest;
import com.sos.base.core.permissions.dtos.UpdatePermissionRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
public class PermissionController {
   @Autowired
   private PermissionService permissionService;

   @GetMapping
   @PreAuthorize("@auth.hasPermission('GET_PERMISSIONS')")
   public ResponseEntity<List<PermissionEntity>> findAll() {
      return ResponseEntity.ok(permissionService.findAll());
   }

   @PostMapping
   @PreAuthorize("@auth.hasPermission('ADD_PERMISSION')")
   public ResponseEntity<PermissionEntity> create(@Valid @RequestBody CreatePermissionRequest request) {
      return ResponseEntity.ok(permissionService.create(request));
   }

   @PutMapping("/{id}")
   @PreAuthorize("@auth.hasPermission('UPDATE_PERMISSION')")
   public ResponseEntity<PermissionEntity> update(
         @PathVariable String id,
         @Valid @RequestBody UpdatePermissionRequest request) {
      UUID uuid = UUID.fromString(id);
      return ResponseEntity.ok(permissionService.update(uuid, request));
   }

   @DeleteMapping("/{id}")
   @PreAuthorize("@auth.hasPermission('DELETE_PERMISSION')")
   public ResponseEntity<Void> delete(@PathVariable String id) {
      UUID uuid = UUID.fromString(id);

      permissionService.delete(uuid);
      return ResponseEntity.noContent().build();
   }
}
