package com.rally.up.go.dto;

import java.util.List;

public record ClientUserDTO(
        long id,
        String username,
        String email,
        String qrCode,
        int balance,
        List<CouponDTO> couponDTOList
) {
}
