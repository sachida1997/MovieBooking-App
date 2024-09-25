package com.moviebookingapp.security.jwt;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com. moviebookingapp.security.services.UserDetailsImpl;

import io.jsonwebtoken.*;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${movieapp.app.jwtSecret}")
    private String jwtSecret;

    @Value("${movieapp.app.jwtExpirationMs}")
    private int jwtExpirationMs;

/*generateJwtToken() method takes Authentication object as a argument which represents the current user's authentication 
information. It retrieves the user details from the Authentication object , specially the username, and it uses to build
the jwt token.the token includes subject(username),issuedAt date(current date),expiration date(current date+jwtExpirationMs)
and is signed using the jwtSecret. */  
    
    
    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

/*the getUserNameFromJwtToken method takes a jwt token as a paramter and parses it to extract the subject(username) from 
 * the token's claim. It uses the jwtSecret to verify the token's signature.*/    
    
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
    
    
/*the validateJwtToken method takes a JWT token as a parameter and validates its authenticity and integrity.It uses the
 *  jwtSecret to verify the token's signature. if the token is successfully parse without any exceptions, it means the token
 *  is valid otherwise it shows the exception*/
    
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}