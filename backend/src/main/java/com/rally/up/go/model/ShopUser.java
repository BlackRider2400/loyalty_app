package com.rally.up.go.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@DiscriminatorValue("Shop")
public class ShopUser extends User {

    private String shopName;

    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

    public ShopUser(String username, String password, String email, boolean enabled, String shopName) {
        super(null, username, password, email, enabled, null); // id = null
        this.shopName = shopName;
    }

    public ShopUser() {
        super();
        products = new ArrayList<>();
    }
}
