package com.sos.base.core.permissions;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<PermissionEntity, UUID> {
   Optional<PermissionEntity> findByName(String name);

   Set<PermissionEntity> findByNameIn(Set<String> names);
}
