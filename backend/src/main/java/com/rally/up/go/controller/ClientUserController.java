package com.rally.up.go.controller;

import com.rally.up.go.dto.ClientUserDTO;
import com.rally.up.go.dto.ProductResponseDTO;
import com.rally.up.go.dto.ShopUserDTO;
import com.rally.up.go.exception.ProductNotFoundException;
import com.rally.up.go.exception.UuidNotFoundException;
import com.rally.up.go.mapper.ClientUserMapper;
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
import java.util.stream.Collectors;

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



    @GetMapping("/me")
    public ResponseEntity<ClientUserDTO> me(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            ClientUser clientUser = clientUserRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("ShopUser " + userDetails.getUsername() + " not found."));
            return ResponseEntity.ok(clientUserMapper.toDto(clientUser));
        }

        return ResponseEntity.notFound().build();
    }

    // get all shops
    @GetMapping("/shops")
    public ResponseEntity<List<ShopUserDTO>> getAllShops() {

        shopUserRepository.findAll();

        return ResponseEntity.ok()
                .body(shopUserRepository.findAll().stream()
                        .map(shopUser -> shopUserMapper.toDto(shopUser)).collect(Collectors.toList()));
    }
    // get all products for a shop

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponseDTO>> getProductsForShop(@RequestParam Long shopId) {
        ShopUser shopUser = shopUserRepository.findById(shopId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found"));

        List<Product> productList = shopUser.getProducts();

        return ResponseEntity.ok(productList.stream()
                .map(product -> productMapper.toDto(product)).toList());
    }

    // create coupon
    @PostMapping("/create-coupon")
    public ResponseEntity<Boolean> createCoupon(
            @RequestParam Long productId,
            @AuthenticationPrincipal UserDetails userDetails) {

        ClientUser clientUser = clientUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User with " + userDetails.getUsername() + "not found."));
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException(productId.toString()));
        if (clientUser.getBalance() >= product.getPrice()) {
            clientUser.removeBalance(product.getPrice());
            Coupon coupon = new Coupon();
            coupon.setProduct(product);
            coupon.setClientUser(clientUser);
            clientUser.getCouponList().add(coupon);

            clientUserRepository.save(clientUser);
            return ResponseEntity.ok().body(true);
        }

        return ResponseEntity.badRequest().body(false);
    }

    // get coupon
    @GetMapping("/coupon")
    public ResponseEntity<Coupon> getCoupon(@RequestParam Long id) {
        Coupon coupon = couponRepository.findById(id).orElseThrow(() -> new RuntimeException("Coupon not found"));
        return ResponseEntity.ok().body(coupon);
    }


}
