package com.sos.base.core.permissions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sos.base.core.permissions.dtos.CreatePermissionRequest;

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
   public ResponseEntity<PermissionEntity> create(@RequestBody CreatePermissionRequest request) {
      return ResponseEntity.ok(permissionService.create(request));
   }
}
