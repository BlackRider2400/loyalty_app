package com.rally.up.go.mapper;

import com.rally.up.go.dto.CouponDTO;
import com.rally.up.go.model.Coupon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CouponMapper {

    @Autowired
    private ProductMapper productMapper;

    public CouponDTO toDto(Coupon coupon) {
        return new CouponDTO(
                coupon.getId(),
                productMapper.toDto(coupon.getProduct()),
                coupon.getCode(),
                coupon.isUsed(),
                coupon.getDateCreated()

        );
    }
}
