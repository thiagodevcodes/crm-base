package com.sos.base.core.banners;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import com.sos.base.shared.exceptions.DataIntegrityException;
import org.springframework.stereotype.Service;

import com.sos.base.core.banner_categories.BannerCategoryRepository;
import com.sos.base.core.banners.dtos.BannerDto;
import com.sos.base.core.banners.dtos.CreateBannerRequest;
import com.sos.base.core.uploads.UploadService;
import com.sos.base.core.uploads.dtos.UploadDto;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

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
    private BannerCategoryRepository bannerCategoryRepository;

    @Autowired
    private UploadService uploadService;

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
    public BannerDto create(CreateBannerRequest dto) throws Exception {
        try {
            UploadDto uploadDto = uploadService.save(dto.getFile());
            BannerEntity bannerEntity = new BannerEntity();

            bannerEntity.setName(uploadDto.getName());
            bannerEntity.setSize(uploadDto.getSize());
            bannerEntity.setType(uploadDto.getType());
            bannerEntity.setKey(uploadDto.getKey());
            bannerEntity.setBannerCategory(bannerCategoryRepository.findById(UUID.fromString(dto.getCategoryId()))
                    .orElseThrow(() -> new DataIntegrityException("Categoria de banner não encontrada")));

            bannerEntity = bannerRepository.save(bannerEntity);

            BannerDto bannerDto = modelMapper.map(bannerEntity, BannerDto.class);

            return bannerDto;
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityException("Erro ao cadastrar role");
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