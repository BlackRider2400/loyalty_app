package com.rally.up.go;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * This class is required for deploying a Spring Boot application as a
 * traditional WAR file to an external servlet container like Tomcat.
 *
 * It extends SpringBootServletInitializer and overrides the configure method
 * to point to the main application class.
 */
public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        // This method is called by the servlet container to initialize the application.
        // It points to the main Spring Boot application class, which is typically
        // the class annotated with @SpringBootApplication.
        return application.sources(RallyUpGoApplication.class);
    }
}
