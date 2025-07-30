package com.rally.up.go.config;

import com.rally.up.go.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/**").permitAll() // Allow public access to /public
                        .requestMatchers("/swagger-ui/**").permitAll() // Allow public access to swagger
                        .requestMatchers("/api-docs/**").permitAll() // Allow public access to swagger
                        .requestMatchers("/api/**").hasRole("USER") // Require ADMIN role for /admin
                        .anyRequest().authenticated() // All other requests require authentication
                )
                .formLogin(form -> form // Enable default form login
                        .permitAll() // Allow access to login page for everyone
                )
                .logout(logout -> logout.permitAll()); // Enable default logout

        return http.build();
    }
}
