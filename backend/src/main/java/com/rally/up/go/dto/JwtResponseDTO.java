package com.rally.up.go.dto;

import com.rally.up.go.security.UserRole;

import java.util.Set;

public record JwtResponseDTO(
        String token,
        String type,
        String email,
        String refreshToken,
        Set<UserRole> roles
) {
    public JwtResponseDTO(String token, String email, String refreshToken, Set<UserRole> roles) {
        this("Bearer", token, email, refreshToken, roles);
    }
}