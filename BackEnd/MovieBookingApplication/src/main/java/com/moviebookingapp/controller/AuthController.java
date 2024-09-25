package com.moviebookingapp.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.moviebookingapp.models.ERole;
import com.moviebookingapp.models.Role;
import com.moviebookingapp.models.User;
import com.moviebookingapp.payload.request.LoginRequest;
import com.moviebookingapp.payload.request.SignupRequest;
import com.moviebookingapp.payload.response.JwtResponse;
import com.moviebookingapp.payload.response.MessageResponse;
import com.moviebookingapp.repository.RoleRepository;
import com.moviebookingapp.repository.UserRepository;
import com.moviebookingapp.security.jwt.JwtUtils;
import com.moviebookingapp.security.services.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1.0/moviebooking")
@Slf4j
@CrossOrigin("*")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/login")
	@Operation(summary = "login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getLoginId(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		// userDetails.getAuthorities() returns the authorities granted to the user.
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(
				new JwtResponse(jwt, userDetails.get_id(), userDetails.getUsername(), userDetails.getEmail(), roles));
	}

	@PostMapping("/register")
	@Operation(summary = "new registration")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByLoginId(signUpRequest.getLoginId())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: LoginId is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getLoginId(), signUpRequest.getFirstName(), signUpRequest.getLastName(),
				signUpRequest.getEmail(), signUpRequest.getContactNumber(),
				encoder.encode(signUpRequest.getPassword()));

		String strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		String errorMessage = "Error: Role is not found.";
		if (strRoles == null) {
			Role userRole1 = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException(errorMessage));
			roles.add(userRole1);
		}

		switch (strRoles) {
		case "admin":
			Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException(errorMessage));
			roles.add(adminRole);

			break;
		case "user":
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException(errorMessage));
			roles.add(userRole);
			break;

		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}


