package com.rally.up.go.controller;

import com.rally.up.go.model.ClientUser;
import jakarta.persistence.DiscriminatorColumn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientUserController {



    @GetMapping("/profile")
    public ResponseEntity<ClientUser> getUserProfile() {

        return ResponseEntity.status(HttpStatus.OK).body("Yes sir");
    }
}
