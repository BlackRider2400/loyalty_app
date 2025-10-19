package com.rally.up.go.controller;

import com.rally.up.go.dto.ShopUserDTO;
import com.rally.up.go.exception.NotEnoughBalanceException;
import com.rally.up.go.exception.UuidNotFoundException;
import com.rally.up.go.mapper.ShopUserMapper;
import com.rally.up.go.model.Coupon;
import com.rally.up.go.model.QrCode;
import com.rally.up.go.dto.QrCodeCreditsDTO;
import com.rally.up.go.model.ShopUser;
import com.rally.up.go.repository.CouponRepository;
import com.rally.up.go.repository.QrCodeRepository;
import com.rally.up.go.repository.ShopUserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Tag(name = "Shop", description = "Operations related to the Shop User profile and client interactions (credits/coupons).")
@RestController
@RequestMapping("/api/shop")
public class ShopController {

    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Autowired
    private ClientUserController clientUserController;

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private ShopUserRepository shopUserRepository;

    @Autowired
    private ShopUserMapper shopUserMapper;

    @Operation(
            summary = "Get current authenticated shop user details",
            description = "Retrieves the profile information for the currently authenticated shop.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Shop profile successfully retrieved.",
                            content = @Content(schema = @Schema(implementation = ShopUserDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Shop user not found."),
                    @ApiResponse(responseCode = "401", description = "Authentication required.")
            }
    )
    @GetMapping("/me")
    public ResponseEntity<ShopUserDTO> me(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            ShopUser shopUser = shopUserRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("ShopUser " + userDetails.getUsername() + " not found."));
            return ResponseEntity.ok(shopUserMapper.toDto(shopUser));
        }

        return ResponseEntity.notFound().build();
    }


    @Operation(
            summary = "Add credits to a client's balance",
            description = "Identifies a client via their QR code UUID and adds the specified amount of credits. Also sets the current shop for the client.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Credits successfully added to the client's balance."),
                    @ApiResponse(responseCode = "404", description = "Authenticated shop user or QR Code UUID not found."),
                    @ApiResponse(responseCode = "400", description = "Invalid credit amount (e.g., less than 0).")
            }
    )
    @PostMapping("/add-credits")
    public ResponseEntity<String> addCreditsToUser(@AuthenticationPrincipal UserDetails userDetails,
                                                   @RequestBody QrCodeCreditsDTO qrCodeCreditsDTO) {

        ShopUser shopUser = shopUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("ShopUser " + userDetails.getUsername() + " not found."));

        if(qrCodeCreditsDTO.credits() < 0){
            throw new IllegalArgumentException("Credits can not be less than 0.");
        }

        QrCode qrCode = qrCodeRepository.findByUuid(qrCodeCreditsDTO.uuid())
                .orElseThrow(() -> new UuidNotFoundException(qrCodeCreditsDTO.uuid()));

        if(qrCode.useQrCode()) {
            qrCode.getClientUser().setCurrentShop(shopUser);
            qrCode.getClientUser().addBalance(qrCodeCreditsDTO.credits());
        } else {
            return ResponseEntity.badRequest().body("QR Code has already been used.");
        }


        qrCodeRepository.save(qrCode);

        return ResponseEntity.ok("Added " + qrCodeCreditsDTO.credits() + " credits to your account.");
    }

    @Operation(
            summary = "Use a coupon for a purchase",
            description = "Processes a coupon by its UUID. Deducts the product's price from the client's balance and marks the coupon as used, or deletes it if the balance is insufficient.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Coupon successfully used and balance deducted."),
                    @ApiResponse(responseCode = "404", description = "Coupon UUID not found."),
                    @ApiResponse(responseCode = "400", description = "Coupon is already used."),
                    @ApiResponse(responseCode = "402", description = "Payment required (Not enough balance to use the coupon).")
            }
    )
    @PostMapping("/use-coupon")
    @Transactional
    public ResponseEntity<Boolean> useCoupon(@RequestBody String uuid) {
        Coupon coupon = couponRepository.findByCode(uuid).orElseThrow(() -> new UuidNotFoundException(uuid));

        if (coupon.getUsed()) {
            throw new IllegalArgumentException("Coupon is already used.");
        }

        if (coupon.getClientUser().getBalance() >= coupon.getProduct().getPrice()) {

            coupon.getClientUser().removeBalance(coupon.getProduct().getPrice());
            coupon.setUsed(true);
            coupon.setDateUsed(LocalDateTime.now());
            couponRepository.save(coupon);

            return ResponseEntity.ok().body(true);
        }
        else {
            couponRepository.deleteUnusedCoupons(coupon.getClientUser().getId(), coupon.getProduct().getId());
            throw new NotEnoughBalanceException(coupon.getProduct().getPrice() - coupon.getClientUser().getBalance());
        }


    }

}
