package com.sos.base.core.roles;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, UUID> {
   Optional<RoleEntity> findByName(String name);

   Set<RoleEntity> findByNameIn(Set<String> names);
}
