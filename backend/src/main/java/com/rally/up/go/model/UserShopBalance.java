package com.rally.up.go.model;

import com.rally.up.go.exception.NotEnoughBalanceException;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_shop_balance",
        uniqueConstraints = @UniqueConstraint(columnNames = {"client_user_id", "shop_user_id"}))
public class UserShopBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_user_id", nullable = false)
    private ClientUser clientUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_user_id", nullable = false)
    private ShopUser shopUser;

    private int balance;

    public void addBalance(int amount) {
        this.balance += amount;
    }

    public void removeBalance(int amount) throws NotEnoughBalanceException {
        if (amount > this.balance) {
            throw new NotEnoughBalanceException(amount - this.balance);
        }
        this.balance -= amount;
    }
}