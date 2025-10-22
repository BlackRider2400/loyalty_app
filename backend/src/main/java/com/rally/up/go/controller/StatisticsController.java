package com.rally.up.go.controller;

import com.rally.up.go.dto.*;
import com.rally.up.go.model.Coupon;
import com.rally.up.go.service.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Statistics", description = "Endpoints for retrieving shop statistics and analytics")
@RestController
@RequestMapping("/api/shop/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @Operation(
        summary = "Get rewards history",
        description = "Retrieves the history of coupons for the authenticated user within the specified date range.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved coupon history",
                content = @Content(schema = @Schema(implementation = CouponDTO.class, type = "array"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "400", description = "Invalid date range parameters")
        }
    )
    @GetMapping("/rewards-history")
    public ResponseEntity<List<CouponDTO>> getCouponsHistory(
            @AuthenticationPrincipal UserDetails userDetails,
            @Parameter(description = "Start date and time for the query (inclusive)", required = true, example = "2025-01-01T00:00:00")
            @RequestParam LocalDateTime from,
            @Parameter(description = "End date and time for the query (inclusive)", required = true, example = "2025-01-31T23:59:59")
            @RequestParam LocalDateTime to) {
        return ResponseEntity.ok()
                .body(statisticsService.getCoupons(userDetails.getUsername(), from, to));
    }

    @Operation(
        summary = "Get daily rewards statistics",
        description = "Retrieves hourly statistics of coupon usage for the specified date.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved hourly coupon statistics",
                content = @Content(schema = @Schema(implementation = CouponHourlyStatsDTO.class, type = "array"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "400", description = "Invalid date parameter")
        }
    )
    @GetMapping("/daily-rewards")
    public ResponseEntity<List<CouponHourlyStatsDTO>> getCouponHourlyStats(
            @AuthenticationPrincipal UserDetails userDetails,
            @Parameter(description = "Date to retrieve statistics for", required = true, example = "2025-01-01T00:00:00")
            @RequestParam LocalDateTime date) {
        return ResponseEntity.ok()
                .body(statisticsService.getInfoAboutCouponsForDay(userDetails.getUsername(), date));
    }

    @Operation(
        summary = "Get reward statistics for time period",
        description = "Retrieves daily statistics of coupon usage within the specified date range.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved coupon statistics",
                content = @Content(schema = @Schema(implementation = CouponDailyStatsDTO.class, type = "array"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "400", description = "Invalid date range parameters")
        }
    )
    @GetMapping("/reward-stats")
    public ResponseEntity<List<CouponDailyStatsDTO>> getCouponStatsForTime(
            @AuthenticationPrincipal UserDetails userDetails,
            @Parameter(description = "Start date and time for the query (inclusive)", required = true, example = "2025-01-01T00:00:00")
            @RequestParam LocalDateTime from,
            @Parameter(description = "End date and time for the query (inclusive)", required = true, example = "2025-01-31T23:59:59")
            @RequestParam LocalDateTime to) {
        return ResponseEntity.ok()
                .body(statisticsService.getCouponStatsForTime(userDetails.getUsername(), from, to));
    }

    @Operation(
        summary = "Get new scans statistics",
        description = "Retrieves statistics about new scans for shop in the specified date range.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved user balance statistics",
                content = @Content(schema = @Schema(implementation = UserShopBalanceStatsDTO.class, type = "array"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "400", description = "Invalid date range parameters")
        }
    )
    @GetMapping("/new-scans")
    public ResponseEntity<List<UserShopBalanceStatsDTO>> getUserBalanceStats(
            @AuthenticationPrincipal UserDetails userDetails,
            @Parameter(description = "Start date and time for the query (inclusive)", required = true, example = "2025-01-01T00:00:00")
            @RequestParam LocalDateTime from,
            @Parameter(description = "End date and time for the query (inclusive)", required = true, example = "2025-01-31T23:59:59")
            @RequestParam LocalDateTime to) {
        return ResponseEntity.ok()
                .body(statisticsService.getUserShopBalanceStats(userDetails.getUsername(), from, to));
    }

    @Operation(
        summary = "Get points distribution statistics",
        description = "Retrieves daily statistics about points (credits) given to users within the specified date range.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved credits statistics",
                content = @Content(schema = @Schema(implementation = CreditsDailyStatsDTO.class, type = "array"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "400", description = "Invalid date range parameters")
        }
    )
    @GetMapping("/giving-points")
    public ResponseEntity<List<CreditsDailyStatsDTO>> getCreditsStats(
            @AuthenticationPrincipal UserDetails userDetails,
            @Parameter(description = "Start date and time for the query (inclusive)", required = true, example = "2025-01-01T00:00:00")
            @RequestParam LocalDateTime from,
            @Parameter(description = "End date and time for the query (inclusive)", required = true, example = "2025-01-31T23:59:59")
            @RequestParam LocalDateTime to) {
        return ResponseEntity.ok()
                .body(statisticsService.getCreditsStats(userDetails.getUsername(), from, to));
    }
}
