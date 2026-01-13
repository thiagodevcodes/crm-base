package com.sos.base.core.roles;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
   RoleEntity findByName(String name);

   Set<RoleEntity> findByNameIn(Set<String> names);
}
