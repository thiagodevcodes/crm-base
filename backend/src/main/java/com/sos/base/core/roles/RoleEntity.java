package com.sos.base.core.roles;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.sos.base.core.permissions.PermissionEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "tb_roles")
public class RoleEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   @Column(name = "role_id", updatable = false, nullable = false)
   private UUID roleId;

   private String name;

   @ManyToMany(fetch = FetchType.EAGER)
   @JoinTable(name = "tb_role_permissions", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "permission_id"))
   private Set<PermissionEntity> permissions = new HashSet<>();

   // public enum Values {
   // ADMIN(1L),
   // BASIC(2L);

   // long roleId;

   // Values(long roleId) {
   // this.roleId = roleId;
   // }

   // public long getRoleId() {
   // return roleId;
   // }
   // }
}
