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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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

    @GetMapping("/me")
    public ResponseEntity<ShopUserDTO> me(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            ShopUser shopUser = shopUserRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("ShopUser " + userDetails.getUsername() + " not found."));
            return ResponseEntity.ok(shopUserMapper.toDto(shopUser));
        }

        return ResponseEntity.notFound().build();
    }


    @PostMapping("/add-credits")
    public ResponseEntity<String> addCreditsToUser(@RequestBody QrCodeCreditsDTO qrCodeCreditsDTO) {

        if(qrCodeCreditsDTO.credits() < 0){
            throw new IllegalArgumentException("Credits can not be less than 0.");
        }

        QrCode qrCode = qrCodeRepository.findByUuid(qrCodeCreditsDTO.uuid())
                .orElseThrow(() -> new UuidNotFoundException(qrCodeCreditsDTO.uuid()));


        qrCode.getClientUser().addBalance(qrCodeCreditsDTO.credits());

        return ResponseEntity.ok("Added " + qrCodeCreditsDTO.credits() + " credits to your account.");
    }

    @PostMapping("/use-coupon")
    public ResponseEntity<Boolean> useCoupon(@RequestBody String uuid) {
        Coupon coupon = couponRepository.findByCode(uuid).orElseThrow(() -> new UuidNotFoundException(uuid));

        if (coupon.getUsed()) {
            throw new IllegalArgumentException("Coupon is already used.");
        }

        if (coupon.getClientUser().getBalance() >= coupon.getProduct().getPrice()) {

            coupon.getClientUser().removeBalance(coupon.getProduct().getPrice());
            coupon.setUsed(true);
            coupon.setDateUsed(LocalDateTime.now());

            return ResponseEntity.ok().body(true);
        }
        else {
            couponRepository.deleteUnusedCoupons(coupon.getClientUser().getId(), coupon.getProduct().getId());
            throw new NotEnoughBalanceException(coupon.getProduct().getPrice() - coupon.getClientUser().getBalance());
        }


    }

}
