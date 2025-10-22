package com.rally.up.go.service;

import com.rally.up.go.dto.*;
import com.rally.up.go.mapper.CouponMapper;
import com.rally.up.go.model.ClientUser;
import com.rally.up.go.model.Coupon;
import com.rally.up.go.model.ShopUser;
import com.rally.up.go.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StatisticsService {

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private UserShopBalanceRepository userShopBalanceRepository;

    @Autowired
    private CreditTransactionRepository creditTransactionRepository;

    @Autowired
    private ShopUserRepository shopUserRepository;

    @Autowired
    private CouponMapper couponMapper;

    public List<CouponDTO> getCoupons(String email, LocalDateTime from, LocalDateTime to) {
        ShopUser shopUser = shopUserRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException(email));
        List<Coupon> couponList = couponRepository.findUsedCouponsByDateRangeAndShopId(shopUser.getId(), from, to);
        return couponList.stream().map(coupon -> couponMapper.toDto(coupon)).toList();
    }

    public List<CouponHourlyStatsDTO> getInfoAboutCouponsForDay(String email, LocalDateTime date) {
        ShopUser shopUser = shopUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Shop user not found with email: " + email));
        return couponRepository.findUsedCouponsGroupedByProductAndHourForDate(shopUser.getId(), date);
    }

    public List<CouponDailyStatsDTO> getCouponStatsForTime(String email, LocalDateTime from, LocalDateTime to) {
        ShopUser shopUser = shopUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Shop user not found with email: " + email));
        return couponRepository.findUsedCouponsGroupedByProductAndDay(shopUser.getId(), from, to);
    }

    public List<UserShopBalanceStatsDTO> getUserShopBalanceStats(String email, LocalDateTime from, LocalDateTime to) {
        ShopUser shopUser = shopUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Shop user not found with email: " + email));
        return userShopBalanceRepository.countNewUsersByShopAndDateRange(shopUser.getId(), from, to);
    }

    public List<CreditsDailyStatsDTO> getCreditsStats(String email, LocalDateTime from, LocalDateTime to) {
        ShopUser shopUser = shopUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Shop user not found with email: " + email));
        return creditTransactionRepository.getCreditsDailyStats(shopUser.getId(), from, to);
    }


}
