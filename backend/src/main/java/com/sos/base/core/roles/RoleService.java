package com.sos.base.core.roles;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sos.base.core.permissions.PermissionRepository;
import com.sos.base.core.roles.dtos.CreateRoleRequest;
import com.sos.base.core.roles.dtos.RoleDto;
import com.sos.base.core.roles.dtos.UpdateRoleRequest;
import com.sos.base.shared.exceptions.BusinessRuleException;
import com.sos.base.shared.exceptions.DataIntegrityException;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PermissionRepository permissionRepository;

    public List<RoleDto> findAll() {
        List<RoleEntity> roleEntity = roleRepository.findAll();

        return roleEntity.stream()
                .map(role -> modelMapper.map(role, RoleDto.class))
                .toList();
    }

    @Transactional
    public RoleDto create(CreateRoleRequest dto) {
        try {
            var permissions = permissionRepository.findByNameIn(dto.permissions());

            if (roleRepository.findByName(dto.name()).isPresent()) {
                throw new DataIntegrityException("Role já cadastrada");
            }

            RoleEntity role = modelMapper.map(dto, RoleEntity.class);
            role.setPermissions(permissions);

            role = roleRepository.save(role);

            return modelMapper.map(role, RoleDto.class);
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityException("Erro ao cadastrar role");
        }

    }

    @Transactional
    public RoleDto update(UUID id, UpdateRoleRequest dto) {
        try {
            var role = roleRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Role não encontrada"));

            var permissions = permissionRepository.findByNameIn(dto.permissions());

            if (permissions.size() != dto.permissions().size()) {
                throw new BusinessRuleException("Uma ou mais permissões informadas não existem");
            }

            modelMapper.map(dto, role);

            role.setPermissions(permissions);

            roleRepository.save(role);

            return modelMapper.map(role, RoleDto.class);

        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityException("Erro ao atualizar role");
        }
    }

    @Transactional
    public void delete(UUID id) {
        try {
            RoleEntity role = roleRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Role não encontrada"));

            roleRepository.delete(role);
        } catch (DataIntegrityViolationException ex) {
            throw new ViolatedForeignKeyException(
                    "Erro ao deletar role");
        }
    }

}