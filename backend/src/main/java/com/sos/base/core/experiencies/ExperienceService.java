package com.sos.base.core.experiencies;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sos.base.shared.exceptions.DataIntegrityException;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

import com.sos.base.core.experiencies.dtos.CreateExperienceRequest;
import com.sos.base.core.experiencies.dtos.UpdateExperienceRequest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ExperienceRepository experienceRepository;

    public List<ExperienceEntity> findAll() {
        return experienceRepository.findAll();
    }

    @Transactional
    public ExperienceEntity create(CreateExperienceRequest dto) {
        try {
            ExperienceEntity experience = modelMapper.map(dto, ExperienceEntity.class);

            return experienceRepository.save(experience);
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityException("Erro ao cadastrar role");
        }

    }

    @Transactional
    public ExperienceEntity update(UUID id, UpdateExperienceRequest request) {
        try {
            ExperienceEntity user = experienceRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Experiência não encontrada"));

            modelMapper.map(request, user);

            return experienceRepository.save(user);
        } catch (DataIntegrityViolationException ex) {
            throw new ViolatedForeignKeyException(
                    "Não foi possível atualizar a experiência.");
        }

    }

    @Transactional
    public void delete(UUID id) {
        try {
            if (!experienceRepository.existsById(id))
                throw new NotFoundException("Experiência não encontrada");

            experienceRepository.deleteById(id);
        } catch (DataIntegrityViolationException ex) {
            throw new ViolatedForeignKeyException(
                    "Não foi possível deletar essa experiência.");
        }
    }
}