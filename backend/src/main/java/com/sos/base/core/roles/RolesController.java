package com.sos.base.core.roles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RolesController {
   @Autowired
   private RoleService roleService;

   @GetMapping
   public ResponseEntity<List<RoleEntity>> findAll() {
      return ResponseEntity.ok(roleService.findAll());
   }
}
