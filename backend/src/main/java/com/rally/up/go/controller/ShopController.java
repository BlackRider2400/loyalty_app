package com.rally.up.go.controller;

import com.rally.up.go.exception.UuidNotFoundException;
import com.rally.up.go.model.Coupon;
import com.rally.up.go.model.QrCode;
import com.rally.up.go.model.QrCodeCreditsDTO;
import com.rally.up.go.repository.CouponRepository;
import com.rally.up.go.repository.QrCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/shop/addCredits")
    public ResponseEntity<String> addCreditsToUser(@RequestBody QrCodeCreditsDTO qrCodeCreditsDTO) {

        if(qrCodeCreditsDTO.credits() < 0){
            throw new IllegalArgumentException("Credits can not be less than 0.");
        }

        QrCode qrCode = qrCodeRepository.findByUuid(qrCodeCreditsDTO.uuid())
                .orElseThrow(() -> new UuidNotFoundException(qrCodeCreditsDTO.uuid()));


        qrCode.getClientUser().addBalance(qrCodeCreditsDTO.credits());

        return ResponseEntity.ok("Added " + qrCodeCreditsDTO.credits() + " credits to your account.");
    }

    @PostMapping("/shop/useCoupon")
    public ResponseEntity<Boolean> useCoupon(@RequestBody String uuid) {
        Coupon coupon = couponRepository.findByCode(uuid).orElseThrow(() -> new UuidNotFoundException(uuid));

        if (coupon.isUsed()) {
            throw new IllegalArgumentException("Coupon is already used.");
        }

        coupon.setUsed(true);
        coupon.setDateUsed(LocalDateTime.now());

        return ResponseEntity.ok().body(true);
    }

    @PostMapping("/shop/checkCoupon")
    public ResponseEntity<Coupon> checkCoupon(@RequestBody String uuid) {
        Coupon coupon = couponRepository.findByCode(uuid).orElseThrow(() -> new UuidNotFoundException(uuid));

        return ResponseEntity.ok().body(coupon);
    }


}
