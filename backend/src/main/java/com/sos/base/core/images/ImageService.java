package com.sos.base.core.images;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

   @Autowired
   private ImageRepository repository;

   public ImageEntity save(MultipartFile file) throws Exception {

      ImageEntity img = new ImageEntity();

      img.setNome(file.getOriginalFilename());
      img.setType(file.getContentType());
      img.setData(file.getBytes());

      return repository.save(img);
   }
}