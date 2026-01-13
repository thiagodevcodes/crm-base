package com.sos.base.auth.exceptions;

public class InvalidCredentialsException extends RuntimeException {
   private static final long serialVersionUID = 1L;

   public InvalidCredentialsException(String msg) {
      super(msg);
   }

   public InvalidCredentialsException(String msg, Throwable cause) {
      super(msg, cause);
   }
}