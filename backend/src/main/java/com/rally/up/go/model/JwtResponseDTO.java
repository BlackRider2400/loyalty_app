package com.rally.up.go.model;

import java.util.Set;

public record JwtResponseDTO(
        String token,
        String type,
        String email,
        String refreshToken,
        Set<String> roles
) {
    public JwtResponseDTO(String token, String email, String refreshToken, Set<String> roles) {
        this("Bearer", token, email, refreshToken, roles);
    }
}