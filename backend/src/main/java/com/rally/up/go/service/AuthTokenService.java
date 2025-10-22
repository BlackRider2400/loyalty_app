package com.rally.up.go.service;

import com.rally.up.go.model.User;
import com.rally.up.go.model.VerificationToken;
import com.rally.up.go.repository.UserRepository;
import com.rally.up.go.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class AuthTokenService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.baseUrl}")
    private String baseUrl;

    @Value("${server.servlet.context-path}")
    private String addToUrl;

    @Value("${verification.expiration}")
    private long expirationTime;

    public void createVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(user, token, expirationTime);
        verificationTokenRepository.save(verificationToken);

        String url = baseUrl + addToUrl + "/auth/activate-account?token=" + token;
        String emailText = "Thank you for registering! Please click the link to activate your account: " + url;
        emailService.sendEmail(user.getEmail(), "Account Activation", emailText);
    }

    public void verifyAccount(String token) {
        Optional<VerificationToken> verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken.isEmpty() || verificationToken.get().getExpiryDate().isBefore(Instant.now())) {
            throw new RuntimeException("Invalid or expired token.");
        }

        User user = verificationToken.get().getUser();
        user.setEnabled(true);
        userRepository.save(user);
        verificationTokenRepository.delete(verificationToken.get());
    }

    public void createPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("User not found with email: " + email));

        verificationTokenRepository.deleteByUser_Id(user.getId());

        String token = UUID.randomUUID().toString();
        VerificationToken passwordResetToken = new VerificationToken(user, token, expirationTime);
        verificationTokenRepository.save(passwordResetToken);

        String url = baseUrl + addToUrl + "/auth/reset-password?token=" + token;
        String emailText = "To reset your password, please click the link: " + url;
        emailService.sendEmail(user.getEmail(), "Password Reset", emailText);
    }

    public void resetPassword(String token, String newPassword){
        Optional<VerificationToken> passwordResetToken = verificationTokenRepository.findByToken(token);
        if (passwordResetToken.isEmpty() || passwordResetToken.get().getExpiryDate().isBefore(Instant.now())){
            throw new RuntimeException("Invalid or expired token");
        }

        User user = passwordResetToken.get().getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        verificationTokenRepository.delete(passwordResetToken.get());
    }
}
