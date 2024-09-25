package com.moviebookingapp.swagger;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    //this method is responsible for creating an ApiKey object the respresents the API Key security scheme in swagger.
    //the constructor of ApiKey takes three parameters : name,keyname and passAs.
    
    private ApiKey apiKey() {
        return new ApiKey("Authorization", AUTHORIZATION_HEADER, "header");
    }

    //configure security for the api documentation.
    private List<SecurityContext> securityContexts() {
        return Arrays.asList(SecurityContext.builder().securityReferences(securityReferences()).build());
    }

    private List<SecurityReference> securityReferences() {
        AuthorizationScope scope = new AuthorizationScope("global", "accessEverything");  
        return Arrays.asList(new SecurityReference("Authorization", new AuthorizationScope[] { scope }));
        
//it creates a SecurityReference by providing the name of security scheme("Authorization") and an array of AuthorizationScope
//in this case it represents a AuthorizationScope with name as global and description as accessEverything(name, description)
       
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(getInfo())
                .securityContexts(securityContexts())
                .securitySchemes(Arrays.asList(apiKey()))
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }
    
 
    //title,description,version,terms of service,contact information,license and license URL
    private ApiInfo getInfo() {
        return new ApiInfo(
                "MovieBooking App",
                "This project is developed by Sachidanand Chouhan",
                "2.0",
                "Terms of Service",
                new Contact("Sachidanand Chouhan", "http://localhost:9093/v3/api-docs", "sachidanandchouhan@gmail.com"),
                "Apache 2.0",
                "http://www.apache.org/licenses/LICENSE-2.0",
                Collections.emptyList()
        );
    }
}
