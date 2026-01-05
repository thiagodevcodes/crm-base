package com.sos.base.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sos.base.entities.Role;
import com.sos.base.repositories.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;


    public List<Role> findAll() {
        return roleRepository.findAll();
    }

}