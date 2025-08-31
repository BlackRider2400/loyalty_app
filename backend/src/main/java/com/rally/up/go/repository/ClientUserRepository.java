package com.rally.up.go.repository;

import com.rally.up.go.model.ClientUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientUserRepository extends JpaRepository<ClientUser, Long> {
    Optional<ClientUser> findByUsername(String username);
    Optional<ClientUser> findByEmail(String email);
}
