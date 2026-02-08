package com.sos.base.auth.dtos;

public record LoginResponse(String accessToken, Long expiresIn, String username, String name) {

}