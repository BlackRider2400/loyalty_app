package com.rally.up.go.controller;

import com.rally.up.go.mapper.ProductMapper;
import com.rally.up.go.model.Product;
import com.rally.up.go.dto.ProductResponseDTO;
import com.rally.up.go.model.ShopUser;
import com.rally.up.go.repository.ProductRepository;
import com.rally.up.go.repository.ShopUserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/shop/products")
@Log4j2
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShopUserRepository shopUserRepository;

    @Autowired
    private ProductMapper productMapper;

    @Value("${upload.dir}")
    private String filePath;

    // CREATE
    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(@AuthenticationPrincipal UserDetails userDetails,
            @RequestPart("product") ProductResponseDTO dto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get("uploads", fileName);
            Files.copy(image.getInputStream(), filePath);
            imageUrl = "/uploads/" + fileName;
        }

        log.info("Uploading new file to " + imageUrl);

        ShopUser shopUser = shopUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException(userDetails.getUsername()));

        Product product = new Product(null, dto.name(), dto.description(), dto.price(), imageUrl, shopUser);
        productRepository.save(product);

        return ResponseEntity.ok(productMapper.toDto(product));
    }

    // READ
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(
                productRepository.findAll().stream()
                        .map(productMapper::toDto)
                        .toList()
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") ProductResponseDTO dto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {

        return productRepository.findById(id)
                .map(existing -> {
                    existing.setName(dto.name());
                    existing.setDescription(dto.description());
                    existing.setPrice(dto.price());

                    if (image != null && !image.isEmpty()) {
                        try {
                            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                            Path filePath = Paths.get("uploads", fileName);
                            Files.copy(image.getInputStream(), filePath);
                            existing.setImage("/uploads/" + fileName);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    productRepository.save(existing);
                    return ResponseEntity.ok(productMapper.toDto(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

