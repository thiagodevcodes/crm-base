package com.sos.base.core.banners;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import com.sos.base.shared.exceptions.DataIntegrityException;
import org.springframework.stereotype.Service;

import com.sos.base.core.banner_categories.BannerCategoryEntity;
import com.sos.base.core.banner_categories.BannerCategoryRepository;
import com.sos.base.core.banners.dtos.BannerDto;
import com.sos.base.core.banners.dtos.CreateBannerRequest;
import com.sos.base.core.uploads.UploaderService;
import com.sos.base.core.uploads.dtos.UploadDto;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BannerService {
    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    private BannerCategoryRepository bannerCategoryRepository;

    @Autowired
    private UploaderService uploadService;

    public List<BannerDto> findAll() {
        return bannerRepository.findAll()
                .stream()
                .map(banner -> {
                    String signedUrl = uploadService.generateSignedUrl(banner.getKey());

                    return new BannerDto(
                            banner.getBannerId(),
                            banner.getName(),
                            banner.getKey(),
                            banner.getType(),
                            signedUrl,
                            banner.getSize());
                })
                .toList();
    }

    public List<BannerDto> findAllByCategory(String categoryId) {
        bannerCategoryRepository.findById(UUID.fromString(categoryId))
                .orElseThrow(() -> new DataIntegrityException("Categoria de banner não encontrada"));

        return bannerRepository.findByBannerCategory_BannerCategoryId(UUID.fromString(categoryId))
                .stream()
                .map(banner -> {
                    String signedUrl = uploadService.generateSignedUrl(banner.getKey());

                    return new BannerDto(
                            banner.getBannerId(),
                            banner.getName(),
                            banner.getKey(),
                            banner.getType(),
                            signedUrl,
                            banner.getSize());
                })
                .toList();
    }

    public BannerDto findById(UUID id) {
        var banner = bannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Banner não encontrado"));

        String signedUrl = uploadService.generateSignedUrl(banner.getKey());

        return new BannerDto(
                banner.getBannerId(),
                banner.getName(),
                banner.getKey(),
                banner.getType(),
                signedUrl,
                banner.getSize());
    }

    @Transactional
    public List<BannerDto> create(CreateBannerRequest dto) throws Exception {
        try {
            List<UploadDto> uploadDtos = uploadService.saveMulti(dto.getFiles());

            BannerCategoryEntity category = bannerCategoryRepository
                    .findById(UUID.fromString(dto.getBannerCategoryId()))
                    .orElseThrow(() -> new DataIntegrityException(
                            "Categoria de banner não encontrada"));

            List<BannerEntity> banners = new ArrayList<>();

            for (UploadDto uploadDto : uploadDtos) {
                BannerEntity bannerEntity = new BannerEntity();

                bannerEntity.setName(uploadDto.getName());
                bannerEntity.setSize(uploadDto.getSize());
                bannerEntity.setType(uploadDto.getType());
                bannerEntity.setKey(uploadDto.getKey());
                bannerEntity.setBannerCategory(category);

                banners.add(bannerEntity);
            }

            banners = bannerRepository.saveAll(banners);

            return banners.stream()
                    .map(banner -> {
                        String signedUrl = uploadService.generateSignedUrl(banner.getKey());
                        return new BannerDto(
                                banner.getBannerId(),
                                banner.getName(),
                                banner.getKey(),
                                banner.getType(),
                                signedUrl,
                                banner.getSize()
                        );
                    })
                    .toList();

        } catch (DataIntegrityViolationException ex) {

            throw new DataIntegrityException(
                    "Erro ao cadastrar banners");
        }
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