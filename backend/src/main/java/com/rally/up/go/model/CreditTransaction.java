package com.rally.up.go.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int amount;
    private Instant transactionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_user_id", nullable = false)
    private ClientUser clientUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_user_id", nullable = false)
    private ShopUser shopUser;



    @PrePersist
    protected void onCreate() {
        this.transactionDate = Instant.now();
    }
}
