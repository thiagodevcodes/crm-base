package com.sos.base.shared.exceptions;

public class ViolatedForeignKeyException extends RuntimeException {
   private static final long serialVersionUID = 1L;

   public ViolatedForeignKeyException(String msg) {
      super(msg);
   }

   public ViolatedForeignKeyException(String msg, Throwable cause) {
      super(msg, cause);
   }
}