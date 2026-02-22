package com.sos.base.core.images;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sos.base.core.images.dtos.ImageDto;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.web.uploads.UploadDto;
import com.sos.base.shared.web.uploads.UploadService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

   @Autowired
   private ModelMapper modelMapper;

   @Autowired
   private UploadService uploadService;

   @Autowired
   private ImageService imageService;

   @Autowired
   private ImageRepository uploadRepository;

   @PostMapping("/upload")
   public ResponseEntity<ImageDto> upload(@RequestParam("file") MultipartFile file)
         throws Exception {

      UploadDto upload = uploadService.save(file);

      imageService.save(upload);

      ImageDto imageDto = modelMapper.map(upload, ImageDto.class);

      return ResponseEntity.ok(imageDto);
   }

   @GetMapping
   public ResponseEntity<List<ImageDto>> findAll() {
      return ResponseEntity.ok(imageService.findAll());
   }

   @GetMapping("/{id}")
   public ResponseEntity<ImageDto> find(@PathVariable String id) {

      UUID uuid = UUID.fromString(id.toString());

      ImageEntity img = uploadRepository.findById(uuid)
            .orElseThrow(() -> new NotFoundException("Imagem não encontrada"));

      ImageDto uploadDto = modelMapper.map(img, ImageDto.class);

      return ResponseEntity.ok(uploadDto);

   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> delete(@PathVariable String id) {

      UUID uuid = UUID.fromString(id.toString());

      uploadRepository.findById(uuid)
            .orElseThrow(() -> new NotFoundException("Imagem não encontrada"));

      imageService.delete(uuid);

      return ResponseEntity.noContent().build();
   }
}
