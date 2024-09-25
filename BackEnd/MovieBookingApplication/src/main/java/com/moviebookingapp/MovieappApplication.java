package com.moviebookingapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.endpoint.web.CorsEndpointProperties;
import org.springframework.boot.actuate.autoconfigure.endpoint.web.WebEndpointProperties;
import org.springframework.boot.actuate.autoconfigure.web.server.ManagementPortType;
import org.springframework.boot.actuate.endpoint.ExposableEndpoint;
import org.springframework.boot.actuate.endpoint.web.EndpointLinksResolver;
import org.springframework.boot.actuate.endpoint.web.EndpointMapping;
import org.springframework.boot.actuate.endpoint.web.EndpointMediaTypes;
import org.springframework.boot.actuate.endpoint.web.ExposableWebEndpoint;
import org.springframework.boot.actuate.endpoint.web.WebEndpointsSupplier;
import org.springframework.boot.actuate.endpoint.web.annotation.ControllerEndpointsSupplier;
import org.springframework.boot.actuate.endpoint.web.annotation.ServletEndpointsSupplier;
import org.springframework.boot.actuate.endpoint.web.servlet.WebMvcEndpointHandlerMapping;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com. moviebookingapp.models.ERole;
import com. moviebookingapp.models.Movie;
import com. moviebookingapp.models.Role;
import com. moviebookingapp.repository.MovieRepository;
import com. moviebookingapp.repository.RoleRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@SpringBootApplication
public class MovieappApplication implements CommandLineRunner {

	@Autowired
	private MovieRepository movieRepository;
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private MongoTemplate mongoTemplate;


	public static void main(String[] args) {
		SpringApplication.run(MovieappApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		mongoTemplate.dropCollection("roles");
		mongoTemplate.dropCollection("movie");

	
		Movie movie1 = new Movie("JAWAN","PVR",12,"Book ASAP");
	 	Movie movie2 = new Movie("JAILER","INOX",20,"Book ASAP");
	 	Movie movie3 = new Movie("OMG 2","PVR",14,"Book ASAP");

	 	movieRepository.saveAll(List.of(movie1,movie2,movie3));
	 	
	 	
	 	

		Role admin = new Role(ERole.ROLE_ADMIN);
		Role user = new Role(ERole.ROLE_USER);

		roleRepository.saveAll(List.of(admin,user));
	}
	
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*");
			}
		};
	}
	
	
	
	
	
	
	@Bean
	public WebMvcEndpointHandlerMapping webEndpointServletHandlerMapping(
	                WebEndpointsSupplier webEndpointsSupplier, 
	                ServletEndpointsSupplier servletEndpointsSupplier, 
	                ControllerEndpointsSupplier controllerEndpointsSupplier, 
	                EndpointMediaTypes endpointMediaTypes,
	                CorsEndpointProperties corsProperties, 
	                WebEndpointProperties webEndpointProperties, 
	                Environment environment) {
	    List<ExposableEndpoint<?>> allEndpoints = new ArrayList();
	    Collection<ExposableWebEndpoint> webEndpoints = webEndpointsSupplier.getEndpoints();
	    allEndpoints.addAll(webEndpoints);
	    allEndpoints.addAll(servletEndpointsSupplier.getEndpoints());
	    allEndpoints.addAll(controllerEndpointsSupplier.getEndpoints());
	    String basePath = webEndpointProperties.getBasePath();
	    EndpointMapping endpointMapping = new EndpointMapping(basePath);
	    boolean shouldRegisterLinksMapping = this.shouldRegisterLinksMapping(
	                webEndpointProperties, environment, basePath);
	    return new WebMvcEndpointHandlerMapping(endpointMapping, webEndpoints, 
	                endpointMediaTypes, corsProperties.toCorsConfiguration(), 
	                new EndpointLinksResolver(allEndpoints, basePath), 
	                shouldRegisterLinksMapping, null);
	}

	private boolean shouldRegisterLinksMapping(WebEndpointProperties webEndpointProperties, 
	                                           Environment environment, String basePath) {
	    return webEndpointProperties.getDiscovery().isEnabled() && 
	                (StringUtils.hasText(basePath) || 
	                ManagementPortType.get(environment).equals(ManagementPortType.DIFFERENT));
	}
}
