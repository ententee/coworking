package com.ententee.coworking.auth;

public record LoginRequest(
        String username,
        String password
) {
}
