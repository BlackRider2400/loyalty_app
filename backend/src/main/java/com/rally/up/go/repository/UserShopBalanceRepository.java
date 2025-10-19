package com.rally.up.go.repository;

import com.rally.up.go.dto.UserShopBalanceStatsDTO;
import com.rally.up.go.model.UserShopBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserShopBalanceRepository extends JpaRepository<UserShopBalance, Long> {

    @Query("SELECT new com.rally.up.go.dto.UserShopBalanceStatsDTO(" +
            "CAST(DATE(usb.createdAt) AS string), " +
            "COUNT(DISTINCT usb.clientUser.id)) " +
            "FROM UserShopBalance usb " +
            "WHERE usb.shopUser.id = :shopId " +
            "AND usb.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY FUNCTION('DATE_FORMAT', usb.createdAt, '%Y-%m-%d') " +
            "ORDER BY FUNCTION('DATE_FORMAT', usb.createdAt, '%Y-%m-%d') DESC")
    List<UserShopBalanceStatsDTO> countNewUsersByShopAndDateRange(
            @Param("shopId") Long shopId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
