package com.rally.up.go.dto;

import java.time.LocalDate;

public record UserShopBalanceStatsDTO(LocalDate date, Long userCount) {
}
