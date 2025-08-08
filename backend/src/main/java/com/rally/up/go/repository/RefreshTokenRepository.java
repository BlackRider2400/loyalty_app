package com.rally.up.go.repository;

import com.rally.up.go.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    // JPQL query to find a refresh token by the user's email
    // This correctly navigates the relationship from RefreshToken to User
    @Query("SELECT r FROM RefreshToken r WHERE r.user.email = :email")
    Optional<RefreshToken> findByUserEmail(@Param("email") String email);

    // Deletes refresh tokens by the user's email using a JPQL query
    @Transactional
    @Modifying
    @Query("DELETE FROM RefreshToken r WHERE r.user.email = :email")
    void deleteByUserEmail(@Param("email") String email);
}
