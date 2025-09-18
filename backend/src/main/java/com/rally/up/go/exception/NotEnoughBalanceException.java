package com.rally.up.go.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.PAYMENT_REQUIRED)
public class NotEnoughBalanceException extends RuntimeException {
    public NotEnoughBalanceException(int missingCredits) {
        super(String.format("Not enough credits, missing: %d credits.", missingCredits));
    }
}
