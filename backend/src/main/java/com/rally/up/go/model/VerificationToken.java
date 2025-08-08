package com.rally.up.go.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;

@Entity
@Table(name = "verification_tokens")
@Data
@NoArgsConstructor
public class VerificationToken {

    @Value("${verification.expiration}")
    private long expirationTime;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private Instant expiryDate;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    public VerificationToken(User user, String token) {
        this.user = user;
        this.expiryDate = calculateExpiryDate();
        this.token = token;
    }

    private Instant calculateExpiryDate() {
        return Instant.now().plusMillis(expirationTime);
    }
}
