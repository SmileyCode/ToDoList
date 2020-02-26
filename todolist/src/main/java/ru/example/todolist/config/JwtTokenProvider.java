package ru.example.todolist.config;

import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import ru.example.todolist.domain.User;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static ru.example.todolist.config.SecurityConstants.EXPIRATION_TIME;
import static ru.example.todolist.config.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {
    public String generateToken(Authentication auth){
        User user = (User) auth.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId);
        claims.put("username", user.getUsername());
        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        }
        catch (SignatureException ex){
            System.out.println("Invalid JWT signature");
        }
        catch (MalformedJwtException ex){
            System.out.println("Invalid JWT token");
        }
        catch (ExpiredJwtException ex){
            System.out.println("Expired JWT token");
        }
        catch (UnsupportedJwtException ex){
            System.out.println("Unsupported JWT exception");
        }
        catch (IllegalArgumentException ex){
            System.out.println("JWT claims string is empty");
        }
        return false;
    }

    public Long getUserIdFromJWT(String token){
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String) claims.get("id");
        return Long.parseLong(id);
    }
}
