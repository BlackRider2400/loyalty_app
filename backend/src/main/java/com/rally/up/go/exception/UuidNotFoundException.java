package com.rally.up.go.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UuidNotFoundException extends RuntimeException {

    public UuidNotFoundException(String uuid) {
      super(String.format("Qr code with uuid %s not found", uuid));
    }
}


