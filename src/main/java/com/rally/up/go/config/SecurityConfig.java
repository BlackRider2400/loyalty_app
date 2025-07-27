package com.rally.up.go.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/**").permitAll() // Allow public access to /public
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
