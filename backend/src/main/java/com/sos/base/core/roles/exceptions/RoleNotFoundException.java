package com.sos.base.core.roles.exceptions;

public class RoleNotFoundException extends RuntimeException {
   private static final long serialVersionUID = 1L;

   public RoleNotFoundException(String msg) {
      super(msg);
   }

   public RoleNotFoundException(String msg, Throwable cause) {
      super(msg, cause);
   }
}