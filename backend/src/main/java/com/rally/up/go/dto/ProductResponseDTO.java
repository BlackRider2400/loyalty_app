package com.rally.up.go.dto;

public record ProductResponseDTO(
        long id,
        long shopId,
        String name,
        String description,
        boolean active,
        int price,
        String imageUrl
        ) {
}
