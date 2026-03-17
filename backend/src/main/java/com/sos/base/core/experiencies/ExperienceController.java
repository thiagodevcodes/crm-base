package com.sos.base.core.experiencies;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sos.base.core.experiencies.dtos.CreateExperienceRequest;
import com.sos.base.core.experiencies.dtos.UpdateExperienceRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/experiences")
@RequiredArgsConstructor
public class ExperienceController {
    @Autowired
    private ExperienceService experienceService;

    @GetMapping
    @PreAuthorize("@auth.hasPermission('GET_EXPERIENCES')")
    public ResponseEntity<List<ExperienceEntity>> findAll() {
        return ResponseEntity.ok(experienceService.findAll());
    }

    @PostMapping
    @PreAuthorize("@auth.hasPermission('ADD_EXPERIENCE')")
    public ResponseEntity<ExperienceEntity> create(@Valid @RequestBody CreateExperienceRequest request) {
        return ResponseEntity.ok(experienceService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("@auth.hasPermission('UPDATE_EXPERIENCE')")
    public ResponseEntity<ExperienceEntity> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateExperienceRequest request) {
        UUID uuid = UUID.fromString(id);
        return ResponseEntity.ok(experienceService.update(uuid, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@auth.hasPermission('DELETE_EXPERIENCE')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);

        experienceService.delete(uuid);
        return ResponseEntity.noContent().build();
    }
}
