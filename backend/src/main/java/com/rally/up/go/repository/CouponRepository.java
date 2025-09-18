package com.rally.up.go.repository;

import com.rally.up.go.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByCode(String code);
    Optional<Coupon> findFirstByClientUser_IdAndProduct_IdAndUsed(Long clientUserId, Long productId, Boolean used);

    @Modifying
    @Transactional
    @Query("DELETE FROM Coupon c WHERE c.clientUser.id = :clientUserId AND c.product.id = :productId AND c.used = false")
    void deleteUnusedCoupons(
            @Param("clientUserId") Long clientUserId,
            @Param("productId") Long productId
    );
}
