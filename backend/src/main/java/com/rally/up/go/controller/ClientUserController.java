package com.rally.up.go.controller;

import com.rally.up.go.dto.ClientUserDTO;
import com.rally.up.go.dto.CouponDTO;
import com.rally.up.go.dto.ProductResponseDTO;
import com.rally.up.go.dto.ShopUserDTO;
import com.rally.up.go.exception.NotEnoughBalanceException;
import com.rally.up.go.exception.ProductNotFoundException;
import com.rally.up.go.exception.ShopNotSelectedException;
import com.rally.up.go.exception.UuidNotFoundException;
import com.rally.up.go.mapper.ClientUserMapper;
import com.rally.up.go.mapper.CouponMapper;
import com.rally.up.go.mapper.ProductMapper;
import com.rally.up.go.mapper.ShopUserMapper;
import com.rally.up.go.model.ClientUser;
import com.rally.up.go.model.Coupon;
import com.rally.up.go.model.Product;
import com.rally.up.go.model.ShopUser;
import com.rally.up.go.repository.ClientUserRepository;
import com.rally.up.go.repository.CouponRepository;
import com.rally.up.go.repository.ProductRepository;
import com.rally.up.go.repository.ShopUserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Tag(name = "Client", description = "Operations related to the Client User profile, shops, and coupons.")
@RestController
@RequestMapping("/api/client")
public class ClientUserController {

    @Autowired
    private ShopUserRepository shopUserRepository;

    @Autowired
    private ClientUserRepository clientUserRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private ShopUserMapper shopUserMapper;

    @Autowired
    private ClientUserMapper clientUserMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private CouponMapper couponMapper;


    @Operation(
            summary = "Get current authenticated client user details",
            description = "Retrieves the profile information for the currently authenticated client.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Client profile successfully retrieved.",
                            content = @Content(schema = @Schema(implementation = ClientUserDTO.class))),
                    @ApiResponse(responseCode = "404", description = "User not found."),
                    @ApiResponse(responseCode = "403", description = "Forbidden (user not authenticated)."),
                    @ApiResponse(responseCode = "409", description = "User don't have current shop field.")

            }
    )
    @GetMapping("/me")
    public ResponseEntity<ClientUserDTO> me(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            ClientUser clientUser = clientUserRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("ShopUser " + userDetails.getUsername() + " not found."));

            try {
                ClientUserDTO clientUserDTO = clientUserMapper.toDto(clientUser);

                if (clientUserDTO.currentShopUserDTO() != null && clientUserDTO.currentShopUserDTO().products() != null
                        && !clientUserDTO.currentShopUserDTO().products().isEmpty()) {
                    // Filter out inactive products
                    List<ProductResponseDTO> activeProducts = clientUserDTO.currentShopUserDTO().products().stream()
                            .filter(ProductResponseDTO::active)
                            .toList();

                    // Create a new ShopUserDTO with only active products
                    ShopUserDTO updatedShopUser = new ShopUserDTO(
                            clientUserDTO.currentShopUserDTO().id(),
                            clientUserDTO.currentShopUserDTO().name(),
                            activeProducts
                    );

                    // Create a new ClientUserDTO with the updated shop user
                    clientUserDTO = new ClientUserDTO(
                            clientUserDTO.id(),
                            clientUserDTO.username(),
                            clientUserDTO.email(),
                            clientUserDTO.qrCode(),
                            clientUserDTO.balance(),
                            updatedShopUser,
                            clientUserDTO.couponDTOList()
                    );
                }
                return ResponseEntity.ok(clientUserDTO);
            } catch (ShopNotSelectedException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Select a current shop",
            description = "Sets the specified shop as the client's currently selected shop for balance and product operations.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Shop successfully selected."),
                    @ApiResponse(responseCode = "400", description = "Invalid shop ID or shop not found."),
                    @ApiResponse(responseCode = "404", description = "Authenticated client not found.")
            }
    )
    @PostMapping("/select-shop")
    public ResponseEntity<String> selectShop(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Long shopId) {
        ClientUser clientUser = clientUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("ShopUser " + userDetails.getUsername() + " not found."));
        clientUser.setCurrentShop(shopUserRepository.findById(shopId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found")));

        clientUserRepository.save(clientUser);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "Get all registered shops",
            description = "Retrieves a list of all available shops in the system.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "List of shops successfully retrieved.",
                            content = @Content(schema = @Schema(implementation = ShopUserDTO.class)))
            }
    )
    @GetMapping("/shops")
    public ResponseEntity<List<ShopUserDTO>> getAllShops() {

        shopUserRepository.findAll();

        return ResponseEntity.ok()
                .body(shopUserRepository.findAll().stream()
                        .map(shopUser -> shopUserMapper.toDto(shopUser)).collect(Collectors.toList()));
    }

    @Operation(
            summary = "Get products from the currently selected shop",
            description = "Retrieves the list of products offered by the client's currently selected shop (set via `/select-shop`).",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Products successfully retrieved."),
                    @ApiResponse(responseCode = "404", description = "Client or current shop not found."),
                    @ApiResponse(responseCode = "400", description = "Shop not selected (CurrentShop is null)."),
                    @ApiResponse(responseCode = "409", description = "User don't have current shop field.")
            }
    )
    @GetMapping("/products")
    public ResponseEntity<List<ProductResponseDTO>> getProductsForShop(@AuthenticationPrincipal UserDetails userDetails) {
        ClientUser clientUser = clientUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("ShopUser " + userDetails.getUsername() + " not found."));

        try {
            List<Product> productList = clientUser.getCurrentShop().getProducts()
                    .stream().filter(product -> product.getActive()).toList();
            return ResponseEntity.ok(productList.stream()
                    .map(product -> productMapper.toDto(product)).toList());
        } catch (ShopNotSelectedException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

    }

    @Operation(
            summary = "Create or retrieve a coupon for a product",
            description = "Creates a new coupon for a product at the current shop if the client has sufficient balance. If an unused coupon for this product already exists, it is returned instead of creating a new one.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Coupon successfully created or retrieved.",
                            content = @Content(schema = @Schema(implementation = CouponDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Client or Product not found."),
                    @ApiResponse(responseCode = "402", description = "Not enough balance to acquire the coupon.")
            }
    )
    @GetMapping("/coupon")
    public ResponseEntity<CouponDTO> createCoupon(
            @RequestParam Long productId,
            @AuthenticationPrincipal UserDetails userDetails) {

        ClientUser clientUser = clientUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User with " + userDetails.getUsername() + "not found."));
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException(productId.toString()));

        if (!product.getActive()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Optional<Coupon> notUsedCoupon =
                couponRepository.findFirstByClientUser_IdAndProduct_IdAndUsed(clientUser.getId(), productId, false);

        if (notUsedCoupon.isPresent() && clientUser.getBalance() >= product.getPrice()) {
            return ResponseEntity.ok().body(couponMapper.toDto(notUsedCoupon.get()));
        }
        else if (clientUser.getBalance() >= product.getPrice()) {
            Coupon coupon = new Coupon();
            coupon.setProduct(product);
            coupon.setClientUser(clientUser);
            clientUser.getCouponList().add(coupon);

            clientUserRepository.save(clientUser);
            return ResponseEntity.ok().body(couponMapper.toDto(coupon));
        }
        else {
            throw new NotEnoughBalanceException(product.getPrice() - clientUser.getBalance());
        }
    }


}
