package com.rally.up.go.model;

public record ProductResponseDTO(
        Long id,
        String name,
        String description,
        Double price,
        String imageUrl
        ) {
}
