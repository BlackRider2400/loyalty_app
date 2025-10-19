package com.rally.up.go.model;

import com.rally.up.go.exception.ShopNotSelectedException;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.*;

@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@Data
@AllArgsConstructor
@Entity
@DiscriminatorValue("Client")
public class ClientUser extends User {

    @OneToMany(mappedBy = "clientUser", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Coupon> couponList;

    @OneToMany(mappedBy = "clientUser", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private Set<UserShopBalance> shopBalances = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_shop_id")
    @ToString.Exclude
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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ClientUser that = (ClientUser) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
