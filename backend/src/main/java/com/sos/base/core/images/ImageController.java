package com.sos.base.core.images;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sos.base.shared.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {
   @Autowired
   private ImageRepository imageRepository;

   @Autowired
   private ImageService imageService;

   @PostMapping("/upload")
   @PreAuthorize("@auth.hasPermission('ADD_IMAGE')")
   public ResponseEntity<?> upload(@RequestParam("imagem") MultipartFile file) {
      try {
         return ResponseEntity.ok(imageService.save(file));
      } catch (Exception e) {
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }

   @GetMapping("/{id}")
   @PreAuthorize("@auth.hasPermission('GET_IMAGE')")
   public ResponseEntity<byte[]> find(@PathVariable String id) {

      UUID uuid = UUID.fromString(id.toString());

      ImageEntity img = imageRepository.findById(uuid)
            .orElseThrow(() -> new NotFoundException("Imagem não encontrada"));

      return ResponseEntity.ok()
            .contentType(MediaType.valueOf(img.getType()))
            .body(img.getData());
   }

}
