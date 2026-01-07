package com.sos.base.auth.exceptions;

public class UserForbiddenException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public UserForbiddenException(String msg) {
        super(msg);
    }
    public UserForbiddenException(String msg, Throwable cause) {
        super(msg, cause);
    }
}