package com.sos.base.core.permissions;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "tb_permissions")
public class PermissionEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   @Column(name = "permission_id", updatable = false, nullable = false)
   private UUID permissionId;

   @Column(unique = true, nullable = false)
   private String name;
}