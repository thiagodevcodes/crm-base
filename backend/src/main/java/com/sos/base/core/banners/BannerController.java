package com.sos.base.core.banners;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sos.base.core.banners.dtos.BannerDto;
import com.sos.base.core.banners.dtos.CreateBannerRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/banners")
@RequiredArgsConstructor
public class BannerController {
    @Autowired
    private BannerService bannerService;

    @PostMapping
    @PreAuthorize("@auth.hasPermission('ADD_BANNER')")
    public ResponseEntity<BannerDto> create(@Valid @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("size") Long size,
            @RequestParam("type") String type,
            @RequestParam("bannerCategoryId") String categoryId) throws Exception {
        
        CreateBannerRequest createBannerRequest = new CreateBannerRequest(name, type, type, size, categoryId, file);

        return ResponseEntity.ok(bannerService.create(createBannerRequest));
    }

    @GetMapping
    public ResponseEntity<List<BannerDto>> findAll() {
        return ResponseEntity.ok(bannerService.findAll());
    }

    @GetMapping("/category/{categoryId}")
    @PreAuthorize("@auth.hasPermission('GET_BANNERS')")
    public ResponseEntity<List<BannerDto>> findAllByCategory(@PathVariable String categoryId) {
        return ResponseEntity.ok(bannerService.findAllByCategory(categoryId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BannerDto> find(@PathVariable UUID id) {
        return ResponseEntity.ok(bannerService.findById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@auth.hasPermission('DELETE_BANNER')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        UUID uuid = UUID.fromString(id.toString());
        bannerService.delete(uuid);

        return ResponseEntity.noContent().build();
    }
}
