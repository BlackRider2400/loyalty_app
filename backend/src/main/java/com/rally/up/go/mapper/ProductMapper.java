package com.rally.up.go.mapper;

import com.rally.up.go.model.Product;
import com.rally.up.go.dto.ProductResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    @Value("${app.baseUrl}")
    private String baseUrl;

    @Value("${upload.dir}")
    private String filePath;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    public ProductResponseDTO toDto(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getShop().getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                (product.getImage() == null ? null : baseUrl + contextPath + product.getImage())
        );
    }
}
