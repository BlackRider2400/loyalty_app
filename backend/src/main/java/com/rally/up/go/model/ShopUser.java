package com.rally.up.go.model;


import com.rally.up.go.security.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
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

    @OneToMany(mappedBy = "clientUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserShopBalance> shopBalances = new HashSet<>();

    @OneToMany(mappedBy = "currentShop", cascade = CascadeType.ALL)
    private List<ClientUser> currentClients = new ArrayList<>();

    public ShopUser(String username, String password, String email, boolean enabled, LocalDateTime registeredAt, String shopName) {
        super(null, username, password, email, enabled, registeredAt, Set.of(UserRole.SHOP));
        this.shopName = shopName;
    }

    public ShopUser() {
        super();
        products = new ArrayList<>();
    }
}
