package com.rally.up.go.model;

import com.rally.up.go.exception.ShopNotSelectedException;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.*;

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

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "clientUser")
    private ShopUser currentShop;

    public ClientUser() {
        couponList = new ArrayList<>();
    }

    public void addBalance(int amount) {
        if (currentShop == null){
            throw new ShopNotSelectedException("Shop not selected");
        }
        Optional<UserShopBalance> userShopBalanceOptional = shopBalances.stream()
                .filter(userShopBalance -> userShopBalance.getShopUser().equals(currentShop)).findFirst();
        if (userShopBalanceOptional.isPresent()) {
            userShopBalanceOptional.get().addBalance(amount);
        } else {
            UserShopBalance newUserShopBalance = new UserShopBalance();
            newUserShopBalance.setClientUser(this);
            newUserShopBalance.setShopUser(currentShop);
            newUserShopBalance.setBalance(amount);
            shopBalances.add(newUserShopBalance);
        }
    }

    public void removeBalance(int amount) {
        if (currentShop == null){
            throw new ShopNotSelectedException("Shop not selected");
        }
        Optional<UserShopBalance> userShopBalanceOptional = shopBalances.stream()
                .filter(userShopBalance -> userShopBalance.getShopUser().equals(currentShop)).findFirst();
        if (userShopBalanceOptional.isPresent()) {
            userShopBalanceOptional.get().removeBalance(amount);
        } else {
            UserShopBalance newUserShopBalance = new UserShopBalance();
            newUserShopBalance.setClientUser(this);
            newUserShopBalance.setShopUser(currentShop);
            newUserShopBalance.setBalance(0);
            newUserShopBalance.removeBalance(amount);
            shopBalances.add(newUserShopBalance);
        }

    }

    public int getBalance() {
        if (currentShop == null){
            throw new ShopNotSelectedException("Shop not selected");
        }
        Optional<UserShopBalance> userShopBalanceOptional = shopBalances.stream()
                .filter(userShopBalance -> {
                    return userShopBalance.getShopUser().equals(currentShop);
                }).findFirst();
        return userShopBalanceOptional.map(UserShopBalance::getBalance).orElse(0);
    }

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private QrCode qrCode;
}
