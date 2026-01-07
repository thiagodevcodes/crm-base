package com.sos.base.core.users;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sos.base.core.users.dtos.CreateUserRequest;
import com.sos.base.core.users.dtos.UpdatePasswordRequest;
import com.sos.base.core.users.dtos.UpdateUserRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
    @Autowired
    private UserService userService;

    @PostMapping
    @PreAuthorize("@auth.hasPermission('ADD_USER')")
    public ResponseEntity<UserEntity> create(@RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.create(request));
    }

    @GetMapping
    @PreAuthorize("@auth.hasPermission('GET_USERS')")
    public ResponseEntity<List<UserEntity>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PutMapping("/{id}")
    @PreAuthorize("@auth.hasPermission('UPDATE_USER')")
    public ResponseEntity<UserEntity> update(
        @PathVariable String id,
        @RequestBody UpdateUserRequest request
    ) {
        UUID uuid = UUID.fromString(id);
        return ResponseEntity.ok(userService.update(uuid, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@auth.hasPermission('DELETE_USER')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);

        userService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/password/{id}")
    @PreAuthorize("@auth.hasPermission('UPDATE_PASSWORD_USER')")
        public ResponseEntity<UserEntity> updatePassword(
        @PathVariable String id,
        @RequestBody UpdatePasswordRequest request
    ) {
        UUID uuid = UUID.fromString(id);
        return ResponseEntity.ok(userService.updatePassword(uuid, request));
    }
}
