package com.rally.up.go.model;

public record RegisterRequestDTO(
        String name,
        String email,
        String password
) {}