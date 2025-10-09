package com.rally.up.go.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ShopNotSelectedException extends RuntimeException {
    public ShopNotSelectedException(String message) {
        super(String.format("Shop not selected: %s", message));
    }
}
