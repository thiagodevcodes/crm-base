package com.sos.base.core.banner_categories;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sos.base.core.banner_categories.dtos.CreateBannerCategoryRequest;
import com.sos.base.core.banner_categories.dtos.UpdateBannerCategoryRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/banner_categories")
@RequiredArgsConstructor
public class BannerCategoryController {
    @Autowired
    private BannerCategoryService bannerCategoryService;

    @GetMapping
    public ResponseEntity<List<BannerCategoryEntity>> findAll() {
        return ResponseEntity.ok(bannerCategoryService.findAll());
    }

    @PostMapping
    @PreAuthorize("@auth.hasPermission('ADD_BANNER_CATEGORY')")
    public ResponseEntity<BannerCategoryEntity> create(@Valid @RequestBody CreateBannerCategoryRequest request) {
        return ResponseEntity.ok(bannerCategoryService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("@auth.hasPermission('UPDATE_BANNER_CATEGORY')")
    public ResponseEntity<BannerCategoryEntity> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateBannerCategoryRequest request) {
        UUID uuid = UUID.fromString(id);
        return ResponseEntity.ok(bannerCategoryService.update(uuid, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@auth.hasPermission('DELETE_BANNER_CATEGORY')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);

        bannerCategoryService.delete(uuid);
        return ResponseEntity.noContent().build();
    }
}
