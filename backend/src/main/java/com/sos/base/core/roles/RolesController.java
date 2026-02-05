package com.sos.base.core.roles;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sos.base.core.roles.dtos.CreateRoleRequest;
import com.sos.base.core.roles.dtos.UpdateRoleRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RolesController {
   @Autowired
   private RoleService roleService;

   @GetMapping
   @PreAuthorize("@auth.hasPermission('GET_ROLES')")
   public ResponseEntity<List<RoleEntity>> findAll() {
      return ResponseEntity.ok(roleService.findAll());
   }

   @PostMapping
   @PreAuthorize("@auth.hasPermission('ADD_ROLE')")
   public ResponseEntity<RoleEntity> create(@RequestBody CreateRoleRequest request) {
      return ResponseEntity.ok(roleService.create(request));
   }

   @PutMapping("/{id}")
   @PreAuthorize("@auth.hasPermission('UPDATE_ROLE')")
   public ResponseEntity<RoleEntity> update(
         @PathVariable String id,
         @RequestBody UpdateRoleRequest request) {
      UUID uuid = UUID.fromString(id);
      return ResponseEntity.ok(roleService.update(uuid, request));
   }

   @DeleteMapping("/{id}")
   @PreAuthorize("@auth.hasPermission('DELETE_ROLE')")
   public ResponseEntity<Void> delete(@PathVariable String id) {
      UUID uuid = UUID.fromString(id);

      roleService.delete(uuid);
      return ResponseEntity.noContent().build();
   }
}
