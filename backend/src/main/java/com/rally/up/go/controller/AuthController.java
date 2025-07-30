package com.rally.up.go.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication")
public class AuthController {

    @GetMapping("/test")
    public ResponseEntity<String> testMaping() {
        return new ResponseEntity<String>("Hello world!", HttpStatus.OK);
    }

    @GetMapping("/login-status")
    public String loginStatus() {
        // This method can be used to check if a user is authenticated
        // or to provide a message for API clients.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal() instanceof String && authentication.getPrincipal().equals("anonymousUser"))) {
            return "User is authenticated.";
        } else {
            return "User is not authenticated. Please log in.";
        }
    }
}
