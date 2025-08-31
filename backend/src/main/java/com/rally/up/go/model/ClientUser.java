package com.rally.up.go.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@Entity
@DiscriminatorValue("Client")
public class ClientUser extends User {

    private double balance;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Coupon> couponList;

    public ClientUser() {
        couponList = new ArrayList<>();
    }

    public void addBalance(double amount) {
        this.balance += amount;
    }

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private QrCode qrCode;
}
