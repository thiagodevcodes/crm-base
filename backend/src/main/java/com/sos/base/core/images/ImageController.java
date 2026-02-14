package com.sos.base.core.images;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequiredArgsConstructor // Permite requisições de qualquer origem (ajuste conforme necessário)
public class ImageController {
   @Autowired
   private ImageRepository imageRepository;

   @Autowired
   private ImageService imageService;

   @GetMapping
   public ResponseEntity<List<ImageEntity>> findAll() {
      return ResponseEntity.ok(imageService.findAll());
   }

   @PostMapping("/upload")
   @PreAuthorize("@auth.hasPermission('ADD_IMAGE')")
   public ResponseEntity<?> upload(@RequestParam("image") MultipartFile file) {
      try {
         return ResponseEntity.ok(imageService.save(file));
      } catch (Exception e) {
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }

   @GetMapping("/{id}")
   public ResponseEntity<byte[]> find(@PathVariable String id) {

      UUID uuid = UUID.fromString(id.toString());

      ImageEntity img = imageRepository.findById(uuid)
            .orElseThrow(() -> new NotFoundException("Imagem não encontrada"));

      return ResponseEntity.ok()
            .contentType(MediaType.valueOf(img.getType()))
            .body(img.getData());
   }

   @DeleteMapping("/{id}")
   @PreAuthorize("@auth.hasPermission('DELETE_IMAGE')")
   public ResponseEntity<Void> delete(@PathVariable String id) {
      UUID uuid = UUID.fromString(id);

      imageService.delete(uuid);
      return ResponseEntity.noContent().build();
   }

}
