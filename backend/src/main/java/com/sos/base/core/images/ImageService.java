package com.sos.base.core.images;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sos.base.core.images.dtos.ImageDto;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;
import com.sos.base.shared.web.uploads.UploadDto;
import com.sos.base.shared.web.uploads.UploadService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

   @Autowired
   private ModelMapper modelMapper;

   @Autowired
   private ImageRepository imageRepository;

   @Autowired
   private UploadService uploadService;

   public List<ImageDto> findAll() {
      return imageRepository.findAll()
            .stream()
            .map(image -> {
               String signedUrl = uploadService.generateSignedUrl(image.getKey());

               UUID imageId = UUID.fromString(image.getImageId().toString());

               return new ImageDto(
                     imageId,
                     image.getName(),
                     image.getKey(),
                     image.getType(),
                     signedUrl,
                     image.getSize());
            })
            .toList();
   }

   @Transactional
   public ImageDto save(UploadDto file) throws Exception {

      ImageEntity img = new ImageEntity();

      img.setName(file.getName());
      img.setType(file.getType());
      img.setKey(file.getKey());
      img.setSize(file.getSize());

      img = imageRepository.save(img);
      ImageDto imageDto = modelMapper.map(img, ImageDto.class);

      return imageDto;
   }

   @Transactional
   public void delete(UUID id) {
      ImageEntity image = imageRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Imagem não encontrada"));

      try {
         uploadService.delete(image.getKey());
         imageRepository.delete(image);
      } catch (DataIntegrityViolationException ex) {
         throw new ViolatedForeignKeyException(
               "Não foi possível deletar essa imagem.");
      }
   }
}