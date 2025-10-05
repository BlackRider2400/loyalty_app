package com.rally.up.go.controller;

import com.rally.up.go.dto.JwtResponseDTO;
import com.rally.up.go.dto.LoginRequestDTO;
import com.rally.up.go.dto.RefreshTokenRequestDTO;
import com.rally.up.go.dto.RegisterRequestDTO;
import com.rally.up.go.exception.TokenRefreshException;
import com.rally.up.go.model.*;
import com.rally.up.go.repository.QrCodeRepository;
import com.rally.up.go.repository.UserRepository;
import com.rally.up.go.security.JwtUtil;
import com.rally.up.go.security.UserRole;
import com.rally.up.go.service.AuthTokenService;
import com.rally.up.go.service.RefreshTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Simple AuthController for handling user login (generating JWT) and registration.
 * This version focuses on the core authentication actions.
 */
@RestController
@RequestMapping("/auth") // All endpoints in this controller will start with /auth
@Tag(name = "Authentication", description = "Endpoints for user authentication and management")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private AuthTokenService authTokenService;

    /**
     * Handles user login requests.
     * Authenticates the user with provided credentials and, if successful,
     * generates and returns a JWT access token and a refresh token.
     *
     * @param loginRequestDTO Contains the user's email and password.
     * @return ResponseEntity with JwtResponse on success, or an error status on failure.
     */
    @Operation(summary = "Authenticate a user and get JWT tokens",
            description = "Authenticates with user credentials and returns an access token and a refresh token.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully authenticated",
                    content = @Content(schema = @Schema(implementation = JwtResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid credentials",
                    content = @Content)
    })
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> authenticateUser(
            @RequestBody @Parameter(description = "User credentials (email and password)") LoginRequestDTO loginRequestDTO) {
        try {
            // Authenticate the user using Spring Security's AuthenticationManager
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.email(), loginRequestDTO.password())
            );

            // Set the authenticated object in the SecurityContext (optional for stateless, but good practice)
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Get UserDetails to generate tokens
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwtAccessToken = jwtUtil.generateToken(userDetails);

            // Create and save refresh token for the user
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found after authentication: " + userDetails.getUsername()));
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

            // Return both access token and refresh token
            return ResponseEntity.ok(new JwtResponseDTO(jwtAccessToken, "Bearer", loginRequestDTO.email(),
                    refreshToken.getToken(), user.getRoles()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    /**
     * Handles new client user registration requests.
     * Creates a new user account in the database with encoded password and default roles.
     *
     * @param registrationRequest Contains the user's email and password for registration.
     * @return ResponseEntity indicating success or conflict if email/username already exists.
     */
    @Operation(summary = "Register a new user",
            description = "Creates a new user account with the provided email and password. A verification token is sent for email confirmation.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User registered successfully",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "409", description = "Conflict - Email already in use",
                    content = @Content)
    })
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(
            @RequestBody @Parameter(description = "Details for new user registration") RegisterRequestDTO registrationRequest) {
        if (userRepository.findByEmail(registrationRequest.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Email is already in use!");
        }
        if (userRepository.findByUsername(registrationRequest.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Username (derived from email) is already in use!");
        }

        ClientUser user = new ClientUser();
        user.setUsername(registrationRequest.name());
        user.setEmail(registrationRequest.email());
        user.setPassword(passwordEncoder.encode(registrationRequest.password()));
        user.setEnabled(false);
        user.setRoles(Set.of(UserRole.CLIENT_USER));
        user.setBalance(0);
        user.setRegisteredAt(LocalDateTime.now());

        QrCode qrCode = new QrCode();
        qrCode.setNewUUID();
        qrCode.setClientUser(user);

        user.setQrCode(qrCode);

        userRepository.save(user);
        qrCodeRepository.save(qrCode);
        authTokenService.createVerificationToken(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    @PostMapping("/register-shop/{shopName}")
    public ResponseEntity<String> registerShop(
            @PathVariable String shopName,
            @RequestBody @Parameter(description = "Details for new user registration") RegisterRequestDTO registrationRequest) {
        if (userRepository.findByEmail(registrationRequest.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Email is already in use!");
        }
        if (userRepository.findByUsername(registrationRequest.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Username (derived from email) is already in use!");
        }

        ShopUser user = new ShopUser();
        user.setUsername(registrationRequest.name());
        user.setShopName(shopName);
        user.setEmail(registrationRequest.email());
        user.setPassword(passwordEncoder.encode(registrationRequest.password()));
        user.setEnabled(false);
        user.setRegisteredAt(LocalDateTime.now());
        user.setRoles(Set.of(UserRole.SHOP));


        userRepository.save(user);
        authTokenService.createVerificationToken(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    /**
     * Handles refresh token requests to obtain a new access token.
     * Clients send their refresh token to this endpoint when their access token expires.
     *
     * @param request Contains the refresh token string.
     * @return ResponseEntity with a new JwtResponse (new access token) on success.
     */
    @Operation(summary = "Refresh access token",
            description = "Generates a new JWT access token using a valid refresh token. The refresh token itself is not rotated.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Access token refreshed successfully",
                    content = @Content(schema = @Schema(implementation = JwtResponseDTO.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden - Invalid or expired refresh token",
                    content = @Content)
    })
    @PostMapping("/refresh-token")
    public ResponseEntity<JwtResponseDTO> refreshToken(
            @RequestBody @Parameter(description = "Refresh token to be used for generating a new access token") RefreshTokenRequestDTO request) {
        String requestRefreshToken = request.refreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                            .username(user.getEmail())
                            .password(user.getPassword())
                            .disabled(!user.isEnabled())
                            .accountExpired(false)
                            .accountLocked(false)
                            .credentialsExpired(false)
                            .authorities(user.getRoles().toArray(new String[0]))
                            .build();

                    String newAccessToken = jwtUtil.generateToken(userDetails);
                    return ResponseEntity.ok(new JwtResponseDTO(newAccessToken, "Bearer", user.getEmail(),
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
    @Operation(summary = "Logout a user",
            description = "Invalidates the user's session by deleting their refresh token from the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logged out successfully",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Bad request - No active session to logout",
                    content = @Content)
    })
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal()
                instanceof String && authentication.getPrincipal().equals("anonymousUser"))) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                User user = userRepository.findByEmail(((UserDetails) principal).getUsername())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found for logout: " +
                                ((UserDetails) principal).getUsername()));
                refreshTokenService.deleteByUserId(user.getId());
                SecurityContextHolder.clearContext();
                return ResponseEntity.ok("Logged out successfully!");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No active session to logout.");
    }

    /**
     * Endpoint to activate a user account with a verification token.
     * @param token The verification token received by email.
     * @return ResponseEntity indicating success.
     */
    @Operation(summary = "Activate user account",
            description = "Activates a newly registered user's account using the verification token sent to their email.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Account activated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid or expired token")
    })
    @GetMapping("/activate-account")
    public ResponseEntity<String> activateAccount(@RequestParam @Parameter(description = "Verification token from email") String token) {
        authTokenService.verifyAccount(token);
        return ResponseEntity.ok("Account activated successfully!");
    }

    /**
     * Endpoint to request a password reset link.
     * @param email The email of the user requesting the password reset.
     * @return ResponseEntity indicating that a reset link has been sent.
     */
    @Operation(summary = "Initiate password reset",
            description = "Sends a password reset link to the user's email address.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password reset link sent to your email")
    })
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody @Parameter(description = "Email address for password reset") String email) {
        authTokenService.createPasswordResetToken(email);
        return ResponseEntity.ok("Password reset link sent to your email.");
    }

    /**
     * Endpoint to reset a user's password using a reset token.
     * @param token The password reset token.
     * @param newPassword The new password for the user.
     * @return ResponseEntity indicating success.
     */
    @Operation(summary = "Reset password",
            description = "Resets the user's password using a valid password reset token.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password reset successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid or expired token")
    })
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam @Parameter(description = "Password reset token") String token,
                                                @RequestBody @Parameter(description = "New password") String newPassword){
        authTokenService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password reset successfully.");
    }
}