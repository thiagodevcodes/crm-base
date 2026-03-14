package com.sos.base.core.banners;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sos.base.core.banners.dtos.BannerDto;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;
import com.sos.base.shared.web.uploads.UploadDto;
import com.sos.base.shared.web.uploads.UploadService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BannerService {

   @Autowired
   private ModelMapper modelMapper;

   @Autowired
   private BannerRepository bannerRepository;

   @Autowired
   private UploadService uploadService;

   public List<BannerDto> findAll() {
      return bannerRepository.findAll()
            .stream()
            .map(banner -> {
               String signedUrl = uploadService.generateSignedUrl(banner.getKey());

               UUID bannerId = UUID.fromString(banner.getBannerId().toString());

               return new BannerDto(
                     bannerId,
                     banner.getName(),
                     banner.getKey(),
                     banner.getType(),
                     signedUrl,
                     banner.getSize());
            })
            .toList();
   }

   @Transactional
   public BannerDto save(UploadDto file) throws Exception {

      BannerEntity img = new BannerEntity();

      img.setName(file.getName());
      img.setType(file.getType());
      img.setKey(file.getKey());
      img.setSize(file.getSize());

      img = bannerRepository.save(img);
      BannerDto bannerDto = modelMapper.map(img, BannerDto.class);

      return bannerDto;
   }

   @Transactional
   public void delete(UUID id) {
      BannerEntity banner = bannerRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Banner não encontrado"));

      try {
         uploadService.delete(banner.getKey());
         bannerRepository.delete(banner);
      } catch (DataIntegrityViolationException ex) {
         throw new ViolatedForeignKeyException(
               "Não foi possível deletar esse banner.");
      }
   }
}