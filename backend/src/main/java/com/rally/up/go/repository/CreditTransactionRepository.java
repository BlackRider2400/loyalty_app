package com.rally.up.go.repository;

import com.rally.up.go.dto.CreditsDailyStatsDTO;
import com.rally.up.go.model.CreditTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CreditTransactionRepository extends JpaRepository<CreditTransaction, Long> {

    @Query("SELECT new com.rally.up.go.dto.CreditsDailyStatsDTO(" +
            "CAST(DATE(ct.transactionDate) AS string), " +
            "COUNT(ct), " +
            "SUM(ct.amount) " +
            ") " +
            "FROM CreditTransaction ct " +
            "WHERE ct.shopUser.id = :shopId AND ct.transactionDate BETWEEN :from AND :to " +
            "GROUP BY FUNCTION('DATE_FORMAT', ct.transactionDate, '%Y-%m-%d') " +
            "ORDER BY FUNCTION('DATE_FORMAT', ct.transactionDate, '%Y-%m-%d') DESC")
    List<CreditsDailyStatsDTO> getCreditsDailyStats(@Param("shopId") Long shopId, @Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

}
