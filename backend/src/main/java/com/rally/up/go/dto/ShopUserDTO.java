package com.rally.up.go.dto;

import java.util.List;

public record ShopUserDTO(long id, String name, List<ProductResponseDTO> products) {
}
