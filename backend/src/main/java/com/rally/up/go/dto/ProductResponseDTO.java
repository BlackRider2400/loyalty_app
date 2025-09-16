package com.rally.up.go.dto;

public record ProductResponseDTO(
        long id,
        long shopId,
        String name,
        String description,
        int price,
        String imageUrl
        ) {
}
