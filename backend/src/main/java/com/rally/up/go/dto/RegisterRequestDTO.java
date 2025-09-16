package com.rally.up.go.dto;

public record RegisterRequestDTO(
        String name,
        String email,
        String password
) {}