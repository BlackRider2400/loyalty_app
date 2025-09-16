package com.rally.up.go.mapper;

import com.rally.up.go.dto.ShopUserDTO;
import com.rally.up.go.model.ShopUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ShopUserMapper {

    @Autowired
    private ProductMapper productMapper;

    public ShopUserDTO toDto(ShopUser user) {
        return new ShopUserDTO(
                user.getId(),
                user.getShopName(),
                user.getProducts().stream().map(product -> productMapper.toDto(product)).toList()
        );
    }
}
