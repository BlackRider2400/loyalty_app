package com.rally.up.go.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(indexes = {
        @Index(columnList = "code", unique = true, name = "idx_coupon_code"),
        @Index(columnList = "used, date_used", name = "idx_coupon_used_date"),
        @Index(columnList = "client_user_id, product_id, used", name = "idx_coupon_user_product_used"),
        @Index(columnList = "product_id", name = "idx_coupon_product")
})
@Data
@AllArgsConstructor
@Builder
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private Boolean used;
    private LocalDateTime dateCreated;
    private LocalDateTime dateUsed;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private ClientUser clientUser;

    public Coupon() {
        this.code = UUID.randomUUID().toString();
        this.dateCreated = LocalDateTime.now();
        this.used = false;
    }
}
