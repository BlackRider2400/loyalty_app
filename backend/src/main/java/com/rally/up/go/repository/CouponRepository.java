package com.rally.up.go.repository;

import com.rally.up.go.dto.CouponDailyStatsDTO;
import com.rally.up.go.dto.CouponHourlyStatsDTO;
import com.rally.up.go.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
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

    @Query("SELECT c FROM Coupon c WHERE c.used = true AND c.product.shop.id = :shopId AND c.dateUsed BETWEEN :startDate AND :endDate")
    List<Coupon> findUsedCouponsByDateRangeAndShopId(
            @Param("shopId") Long shopId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query("SELECT new com.rally.up.go.dto.CouponHourlyStatsDTO(" +
            "c.product.id, c.product.name, HOUR(c.dateUsed), COUNT(c)) " +
            "FROM Coupon c " +
            "WHERE c.used = true AND c.product.shop.id = :shopId AND DATE(c.dateUsed) = DATE(:date) " +
            "GROUP BY c.product.id, c.product.name, HOUR(c.dateUsed)")
    List<CouponHourlyStatsDTO> findUsedCouponsGroupedByProductAndHourForDate(
            @Param("shopId") Long shopId,
            @Param("date") LocalDateTime date
    );

    @Query("SELECT new com.rally.up.go.dto.CouponDailyStatsDTO(" +
            "c.product.id, c.product.name, CAST(DATE(c.dateUsed) AS string), COUNT(c)) " +
            "FROM Coupon c " +
            "WHERE c.used = true AND c.product.shop.id = :shopId AND c.dateUsed BETWEEN :startDate AND :endDate " +
            "GROUP BY c.product.id, c.product.name, DATE(c.dateUsed) " +
            "ORDER BY DATE(c.dateUsed) DESC")
    List<CouponDailyStatsDTO> findUsedCouponsGroupedByProductAndDay(
            @Param("shopId") Long shopId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

}
