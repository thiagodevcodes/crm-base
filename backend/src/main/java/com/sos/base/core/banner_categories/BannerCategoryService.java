package com.sos.base.core.banner_categories;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sos.base.shared.exceptions.DataIntegrityException;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;
import com.sos.base.core.banner_categories.dtos.CreateBannerCategoryRequest;
import com.sos.base.core.banner_categories.dtos.UpdateBannerCategoryRequest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BannerCategoryService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BannerCategoryRepository bannerCategoryRepository;

    public List<BannerCategoryEntity> findAll() {
        return bannerCategoryRepository.findAll();
    }

    @Transactional
    public BannerCategoryEntity create(CreateBannerCategoryRequest dto) {
        try {
            BannerCategoryEntity bannerCategory = modelMapper.map(dto, BannerCategoryEntity.class);

            return bannerCategoryRepository.save(bannerCategory);
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityException("Erro ao cadastrar categoria de banner");
        }

    }

    @Transactional
    public BannerCategoryEntity update(UUID id, UpdateBannerCategoryRequest request) {
        try {
            BannerCategoryEntity user = bannerCategoryRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Categoria de banner não encontrada"));

            modelMapper.map(request, user);

            return bannerCategoryRepository.save(user);
        } catch (DataIntegrityViolationException ex) {
            throw new ViolatedForeignKeyException(
                    "Não foi possível atualizar a categoria de banner.");
        }

    }

    @Transactional
    public void delete(UUID id) {
        try {
            if (!bannerCategoryRepository.existsById(id))
                throw new NotFoundException("Categoria de banner não encontrada");

            bannerCategoryRepository.deleteById(id);
        } catch (DataIntegrityViolationException ex) {
            throw new ViolatedForeignKeyException(
                    "Não foi possível deletar essa categoria de banner.");
        }
    }
}