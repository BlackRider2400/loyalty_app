package com.rally.up.go.repository;

import com.rally.up.go.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

    Optional<VerificationToken> findByToken(String token);

    void deleteByToken(String token);

    @Transactional
    @Modifying
    @Query("DELETE FROM VerificationToken t WHERE t.user.id = :userId")
    void deleteByUser_Id(@Param("userId") Long userId);
}
