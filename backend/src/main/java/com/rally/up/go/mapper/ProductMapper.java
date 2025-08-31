package com.rally.up.go.mapper;

import com.rally.up.go.model.Product;
import com.rally.up.go.model.ProductResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    @Value("${app.baseUrl}")
    private String baseUrl;

    @Value("${upload.dir}")
    private String filePath;

    public ProductResponseDTO toDto(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                (baseUrl + "/" +  filePath + "/" + product.getImage())
        );
    }
}
