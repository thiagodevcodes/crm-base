package com.sos.base.core.banners;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sos.base.core.banners.dtos.BannerDto;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.web.uploads.UploadDto;
import com.sos.base.shared.web.uploads.UploadService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class BannerController {

   @Autowired
   private ModelMapper modelMapper;

   @Autowired
   private UploadService uploadService;

   @Autowired
   private BannerService bannerService;

   @Autowired
   private BannerRepository bannerRepository;

   @PostMapping("/upload")
   public ResponseEntity<BannerDto> upload(@RequestParam("file") MultipartFile file)
         throws Exception {

      UploadDto upload = uploadService.save(file);

      bannerService.save(upload);

      BannerDto bannerDto = modelMapper.map(upload, BannerDto.class);

      return ResponseEntity.ok(bannerDto);
   }

   @GetMapping
   public ResponseEntity<List<BannerDto>> findAll() {
      return ResponseEntity.ok(bannerService.findAll());
   }

   @GetMapping("/{id}")
   public ResponseEntity<BannerDto> find(@PathVariable String id) {

      UUID uuid = UUID.fromString(id.toString());

      BannerEntity img = bannerRepository.findById(uuid)
            .orElseThrow(() -> new NotFoundException("Imagem não encontrada"));

      BannerDto bannerDto = modelMapper.map(img, BannerDto.class);

      return ResponseEntity.ok(bannerDto);

   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> delete(@PathVariable String id) {

      UUID uuid = UUID.fromString(id.toString());

      bannerRepository.findById(uuid)
            .orElseThrow(() -> new NotFoundException("Imagem não encontrada"));

      bannerService.delete(uuid);

      return ResponseEntity.noContent().build();
   }
}
