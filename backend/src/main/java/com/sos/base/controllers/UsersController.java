package com.sos.base.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sos.base.controllers.dto.CreateUserRequest;
import com.sos.base.controllers.dto.UpdatePasswordRequest;
import com.sos.base.controllers.dto.UpdateUserRequest;
import com.sos.base.entities.User;
import com.sos.base.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
    @Autowired
    private UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> create(@RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.create(request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> update(
        @PathVariable String id,
        @RequestBody UpdateUserRequest request
    ) {
        UUID uuid = UUID.fromString(id);
        return ResponseEntity.ok(userService.update(uuid, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);

        userService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/password/{id}")
    @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<User> updatePassword(
        @PathVariable String id,
        @RequestBody UpdatePasswordRequest request
    ) {
        UUID uuid = UUID.fromString(id);
        return ResponseEntity.ok(userService.updatePassword(uuid, request));
    }
}
