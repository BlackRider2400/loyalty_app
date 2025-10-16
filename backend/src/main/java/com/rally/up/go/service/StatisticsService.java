package com.rally.up.go.service;

import com.rally.up.go.dto.CouponDTO;
import com.rally.up.go.dto.CouponDailyStatsDTO;
import com.rally.up.go.dto.CouponHourlyStatsDTO;
import com.rally.up.go.dto.UserShopBalanceStatsDTO;
import com.rally.up.go.mapper.CouponMapper;
import com.rally.up.go.model.Coupon;
import com.rally.up.go.repository.CouponRepository;
import com.rally.up.go.repository.UserShopBalanceRepository;
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
    private CouponMapper couponMapper;

    public List<CouponDTO> getCoupons(LocalDateTime from, LocalDateTime to) {
        List<Coupon> couponList = couponRepository.findUsedCouponsByDateRange(from, to);
        return couponList.stream().map(coupon -> couponMapper.toDto(coupon)).toList();
    }

    public List<CouponHourlyStatsDTO> getInfoAboutCouponsForDay(LocalDateTime date) {
        return couponRepository.findUsedCouponsGroupedByProductAndHourForDate(date);
    }

    public List<CouponDailyStatsDTO> getCouponStatsForTime(LocalDateTime from, LocalDateTime to) {
        return couponRepository.findUsedCouponsGroupedByProductAndDay(from, to);
    }

    public List<UserShopBalanceStatsDTO> getUserShopBalanceStats(Long shopId, LocalDateTime from, LocalDateTime to) {
        return userShopBalanceRepository.countNewUsersByShopAndDateRange(shopId, from, to);
    }




}
