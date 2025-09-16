package com.rally.up.go.mapper;

import com.rally.up.go.dto.ClientUserDTO;
import com.rally.up.go.model.ClientUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ClientUserMapper {


    @Autowired
    private CouponMapper couponMapper;

    public ClientUserDTO toDto(ClientUser clientUser) {
        return new ClientUserDTO(
                clientUser.getId(),
                clientUser.getUsername(),
                clientUser.getEmail(),
                clientUser.getQrCode().getUuid(),
                clientUser.getBalance(),
                clientUser.getCouponList().stream().map(coupon -> couponMapper.toDto(coupon)).toList()
        );
    }
}
