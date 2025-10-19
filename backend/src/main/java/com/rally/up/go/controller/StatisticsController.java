package com.rally.up.go.controller;

import com.rally.up.go.dto.CouponDTO;
import com.rally.up.go.model.Coupon;
import com.rally.up.go.service.StatisticsService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/shop/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    //getting all logs
    @GetMapping("/coupons-history")
    public ResponseEntity<List<CouponDTO>> getCouponsHistory(@AuthenticationPrincipal UserDetails userDetails, @RequestParam LocalDateTime from, @RequestParam LocalDateTime to) {
        return ResponseEntity.ok().body(statisticsService.getCoupons(userDetails.getUsername(), from, to));
    }


}
