package br.com.pacto.teste_backend.modules.users.service;

import br.com.pacto.teste_backend.modules.users.domain.entities.Users;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secretKey;

    public String generateSessionToken(Users user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secretKey);
            String token = JWT.create()
                    .withIssuer("test-pacto")
                    .withSubject(user.getEmail())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);

            return token;
        }catch (JWTCreationException ex) {
            throw new RuntimeException("Error while generating token", ex);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secretKey);

            return JWT.require(algorithm)
                    .withIssuer("test-pacto")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch (JWTVerificationException exception) {
            return "";
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
