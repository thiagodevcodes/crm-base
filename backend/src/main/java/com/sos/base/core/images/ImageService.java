package com.sos.base.core.images;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

   @Autowired
   private ImageRepository repository;

   public ImageEntity save(MultipartFile file) throws Exception {

      ImageEntity img = new ImageEntity();

      img.setName(file.getOriginalFilename());
      img.setType(file.getContentType());
      img.setData(file.getBytes());

      return repository.save(img);
   }

   public List<ImageEntity> findAll() {
      return repository.findAll();
   }

   public void delete(UUID id) {
      try {
         if (!repository.existsById(id))
            throw new NotFoundException("Imagem não encontrada");

         repository.deleteById(id);
      } catch (DataIntegrityViolationException ex) {
         throw new ViolatedForeignKeyException(
               "Não foi possível deletar essa imagem.");
      }
   }
}