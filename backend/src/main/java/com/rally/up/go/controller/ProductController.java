package com.rally.up.go.controller;

import com.rally.up.go.mapper.ProductMapper;
import com.rally.up.go.model.Product;
import com.rally.up.go.dto.ProductResponseDTO;
import com.rally.up.go.model.ShopUser;
import com.rally.up.go.repository.ProductRepository;
import com.rally.up.go.repository.ShopUserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
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
import java.nio.file.StandardCopyOption;
import java.util.List;

@Tag(name = "Shop Products", description = "CRUD operations for managing a shop's products.")
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


    @Operation(
            summary = "Add a new product",
            description = "Creates and saves a new product entry for the authenticated shop. Optionally includes an image upload.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product successfully created.",
                            content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Authenticated shop user not found."),
                    @ApiResponse(responseCode = "500", description = "Error during file upload or database save.")
            }
    )
    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(@AuthenticationPrincipal UserDetails userDetails,
                                                         @RequestPart("product") ProductResponseDTO dto,
                                                         @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path absoluteFilePath = Paths.get(filePath, fileName);
            Files.copy(image.getInputStream(), absoluteFilePath, StandardCopyOption.REPLACE_EXISTING);
            imageUrl = "/uploads/" + fileName;
        }

        log.info("Uploading new file to " + imageUrl);

        ShopUser shopUser = shopUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException(userDetails.getUsername()));

        Product product = new Product(null, dto.name(), dto.description(), dto.price(), imageUrl, dto.active(), shopUser);
        productRepository.save(product);

        return ResponseEntity.ok(productMapper.toDto(product));
    }

    @Operation(
            summary = "Get all products for the authenticated shop",
            description = "Retrieves a list of all products belonging to the currently authenticated shop.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "List of products successfully retrieved.",
                            content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Authenticated shop user not found.")
            }
    )
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                shopUserRepository.findByEmail(userDetails.getUsername())
                        .orElseThrow(() -> new UsernameNotFoundException(userDetails.getUsername()))
                        .getProducts().stream()
                        .map(productMapper::toDto)
                        .toList()
        );
    }

    @Operation(
            summary = "Update an existing product",
            description = "Updates the details of a product belonging to the authenticated shop. New image replaces the old one.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Product successfully updated.",
                            content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Product not found."),
                    @ApiResponse(responseCode = "403", description = "Product does not belong to the authenticated shop."),
                    @ApiResponse(responseCode = "500", description = "Error during file upload.")
            }
    )
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

    @Operation(
            summary = "Delete a product",
            description = "Deletes a product by ID, provided it belongs to the authenticated shop.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Product successfully deleted (No Content)."),
                    @ApiResponse(responseCode = "404", description = "Product not found."),
                    @ApiResponse(responseCode = "403", description = "Product does not belong to the authenticated shop.")
            }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        //TODO create some handler for deleting files, best to make service for handling files

        productRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}

