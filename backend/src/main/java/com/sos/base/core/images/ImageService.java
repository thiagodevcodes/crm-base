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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

   @Autowired
   private ModelMapper modelMapper;

   @Autowired
   private ImageRepository imageRepository;

   public ImageDto save(UploadDto file) throws Exception {

      ImageEntity img = new ImageEntity();

      img.setName(file.getName());
      img.setType(file.getType());
      img.setUrl(file.getUrl());

      img = imageRepository.save(img);
      ImageDto imageDto = modelMapper.map(img, ImageDto.class);

      return imageDto;
   }

   public List<ImageEntity> findAll() {
      return imageRepository.findAll();
   }

   public void delete(UUID id) {
      try {
         if (!imageRepository.existsById(id))
            throw new NotFoundException("Imagem não encontrada");

         imageRepository.deleteById(id);
      } catch (DataIntegrityViolationException ex) {
         throw new ViolatedForeignKeyException(
               "Não foi possível deletar essa imagem.");
      }
   }
}