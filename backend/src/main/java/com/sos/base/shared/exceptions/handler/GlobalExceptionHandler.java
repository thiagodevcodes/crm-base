package com.sos.base.shared.exceptions.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.sos.base.auth.exceptions.InvalidCredentialsException;
import com.sos.base.auth.exceptions.TokenInvalidException;
import com.sos.base.auth.exceptions.UserForbiddenException;
import com.sos.base.shared.exceptions.DataIntegrityException;
import com.sos.base.shared.exceptions.NotFoundException;
import com.sos.base.shared.exceptions.ViolatedForeignKeyException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

   @ExceptionHandler(InvalidCredentialsException.class)
   public ResponseEntity<StandardError> userUnauthorized(InvalidCredentialsException e, HttpServletRequest request) {
      StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.UNAUTHORIZED.value(),
            "user or password is invalid", e.getMessage(), request.getRequestURI());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
   }

   @ExceptionHandler(UserForbiddenException.class)
   public ResponseEntity<StandardError> userForbidden(UserForbiddenException e, HttpServletRequest request) {
      StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.FORBIDDEN.value(),
            "user not allowed", e.getMessage(), request.getRequestURI());
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);
   }

   @ExceptionHandler(TokenInvalidException.class)
   public ResponseEntity<StandardError> tokenInvalid(TokenInvalidException e, HttpServletRequest request) {
      StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.UNAUTHORIZED.value(),
            "token invalid or inexistent", e.getMessage(), request.getRequestURI());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
   }

   @ExceptionHandler(ViolatedForeignKeyException.class)
   public ResponseEntity<StandardError> violatedForeignKey(ViolatedForeignKeyException e,
         HttpServletRequest request) {
      StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.CONFLICT.value(),
            "violated foreign key constraint", e.getMessage(), request.getRequestURI());
      return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
   }

   @ExceptionHandler(NotFoundException.class)
   public ResponseEntity<StandardError> notFound(NotFoundException e,
         HttpServletRequest request) {
      StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.NOT_FOUND.value(),
            "resource not found", e.getMessage(), request.getRequestURI());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
   }

   @ExceptionHandler(DataIntegrityException.class)
   public ResponseEntity<StandardError> dataIntegrity(DataIntegrityException e,
         HttpServletRequest request) {
      StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.CONFLICT.value(),
            "data integrity violation", e.getMessage(), request.getRequestURI());
      return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
   }
}