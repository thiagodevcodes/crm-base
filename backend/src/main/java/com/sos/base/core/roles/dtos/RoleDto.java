package com.sos.base.core.roles.dtos;

import java.util.Set;

import com.sos.base.core.permissions.dtos.PermissionDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
   private String roleId;
   private String name;
   private Set<PermissionDto> permissions;
}