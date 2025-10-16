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
public interface UserShopBalanceRepository extends JpaRepository<Long, UserShopBalance> {
    @Query("SELECT new com.rally.up.go.dto.UserShopBalanceStatsDTO(" +
            "DATE(usb.createdAt), COUNT(DISTINCT usb.user.id)) " +
            "FROM UserShopBalance usb " +
            "WHERE usb.shop.id = :shopId " +
            "AND DATE(usb.createdAt) BETWEEN DATE(:startDate) AND DATE(:endDate) " +
            "GROUP BY DATE(usb.createdAt) " +
            "ORDER BY DATE(usb.createdAt) DESC")
    List<UserShopBalanceStatsDTO> countNewUsersByShopAndDateRange(
            @Param("shopId") Long shopId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

}
