package com.rally.up.go.dto;

import java.time.LocalDateTime;

public record CouponDTO(
    long id,
    ProductResponseDTO productDTO,
    String code,
    boolean used,
    LocalDateTime createdAt
) {
}
