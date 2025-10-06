package com.rally.up.go.exception;

public class ShopNotSelectedException extends RuntimeException {
    public ShopNotSelectedException(String message) {
        super(String.format("Shop not selected: %s", message));
    }
}
