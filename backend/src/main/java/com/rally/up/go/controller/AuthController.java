package com.rally.up.go.controller;

import com.rally.up.go.exception.TokenRefreshException;
import com.rally.up.go.model.*;
import com.rally.up.go.repository.UserRepository;
import com.rally.up.go.security.JwtUtil;
import com.rally.up.go.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * Simple AuthController for handling user login (generating JWT) and registration.
 * This version focuses on the core authentication actions.
 */
@RestController
@RequestMapping("/auth") // All endpoints in this controller will start with /auth
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RefreshTokenService refreshTokenService;

    /**
     * Handles user login requests.
     * Authenticates the user with provided credentials and, if successful,
     * generates and returns a JWT access token and a refresh token.
     *
     * @param loginRequest Contains the user's email and password.
     * @return ResponseEntity with JwtResponse on success, or an error status on failure.
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate the user using Spring Security's AuthenticationManager
            // This will use your CustomUserDetailsService to load user by email
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            // Set the authenticated object in the SecurityContext (optional for stateless, but good practice)
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Get UserDetails to generate tokens
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwtAccessToken = jwtUtil.generateToken(userDetails);

            // Create and save refresh token for the user
            User user = userRepository.findByEmail(userDetails.getUsername()) // userDetails.getUsername() is email here
                    .orElseThrow(() -> new UsernameNotFoundException("User not found after authentication: " + userDetails.getUsername()));
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

            // Return both access token and refresh token
            return ResponseEntity.ok(new JwtResponse(jwtAccessToken, "Bearer", loginRequest.getEmail(),
                    refreshToken.getToken(), user.getRoles()));

        } catch (UsernameNotFoundException e) {
            // Specific exception for user not found (e.g., email doesn't exist)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } catch (Exception e) {
            // General authentication failure (e.g., bad credentials)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    /**
     * Handles new user registration requests.
     * Creates a new user account in the database with encoded password and default roles.
     *
     * @param registrationRequest Contains the user's email and password for registration.
     * @return ResponseEntity indicating success or conflict if email/username already exists.
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody LoginRequest registrationRequest) {
        // Check if email is already in use
        if (userRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Email is already in use!");
        }
        // Assuming username is derived from email for simplicity, ensure uniqueness if it's a separate field
        if (userRepository.findByUsername(registrationRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Username (derived from email) is already in use!");
        }

        // Create new user's account
        User user = new User();
        user.setUsername(registrationRequest.getEmail()); // Using email as username for simplicity
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword())); // Encode password!
        user.setEnabled(true);
        user.setRoles(Set.of("USER")); // Assign default role

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    /**
     * Handles refresh token requests to obtain a new access token.
     * Clients send their refresh token to this endpoint when their access token expires.
     *
     * @param request Contains the refresh token string.
     * @return ResponseEntity with a new JwtResponse (new access token) on success.
     */
    @PostMapping("/refresh-token")
    public ResponseEntity<JwtResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration) // Verify if the refresh token is expired
                .map(RefreshToken::getUser) // Get the User associated with the refresh token
                .map(user -> {
                    // Build UserDetails from the User entity to generate a new access token
                    UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                            .username(user.getEmail()) // Use email as username for UserDetails
                            .password(user.getPassword())
                            .disabled(!user.isEnabled())
                            .accountExpired(false)
                            .accountLocked(false)
                            .credentialsExpired(false)
                            .authorities(user.getRoles().toArray(new String[0])) // Convert roles to authorities
                            .build();

                    String newAccessToken = jwtUtil.generateToken(userDetails);
                    // Return the new access token along with the original refresh token (no rotation in this simple version)
                    return ResponseEntity.ok(new JwtResponse(newAccessToken, "Bearer", user.getEmail(),
                            requestRefreshToken, user.getRoles()));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!"));
    }

    /**
     * Handles user logout.
     * For local users, it deletes their refresh token from the database.
     *
     * @return ResponseEntity indicating successful logout.
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal()
                instanceof String && authentication.getPrincipal().equals("anonymousUser"))) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                // For local users, delete their refresh token to invalidate future access
                User user = userRepository.findByEmail(((UserDetails) principal).getUsername())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found for logout: " +
                                ((UserDetails) principal).getUsername()));
                refreshTokenService.deleteByUserId(user.getId());
                SecurityContextHolder.clearContext(); // Clear security context
                return ResponseEntity.ok("Logged out successfully!");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No active session to logout.");
    }
}
