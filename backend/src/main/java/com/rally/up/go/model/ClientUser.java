package com.rally.up.go.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@Entity
@DiscriminatorValue("Client")
public class ClientUser extends User {

    @OneToMany(mappedBy = "clientUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Coupon> couponList;

    @OneToMany(mappedBy = "clientUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserShopBalance> shopBalances = new HashSet<>();

    public ClientUser() {
        couponList = new ArrayList<>();
    }

    public void addBalance(int amount) {
        this.balance += amount;
    }

    public void removeBalance(int amount) {
        this.balance -= amount;
    }

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private QrCode qrCode;
}
