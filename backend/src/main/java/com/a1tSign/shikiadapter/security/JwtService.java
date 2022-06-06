package com.a1tSign.shikiadapter.security;

import com.a1tSign.shikiadapter.contracts.dto.to.ModeratorTo;
import com.a1tSign.shikiadapter.contracts.enums.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.SignatureAlgorithm;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private final ObjectMapper objectMapper;

    @Value ("${token.secret}")
    private String secret;

    @Value("${token.expiresIn}")
    private Integer expiresIn;

    private Date getExpireDate() {
        return Date.from(Instant.now().plusSeconds(expiresIn));
    }

    public String getToken(ModeratorTo userDto) {
        return Jwts.builder()
                .setSubject(userDto.getId().toString())
                .setExpiration(getExpireDate())
                .claim("role", userDto.getRole().getName())
                .claim("username", userDto.getUsername())
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public ModeratorTo parseJwt(String token) {
        var tokenClaims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();


        if (tokenClaims.getExpiration().before(Date.from(Instant.now()))) {
            throw new SecurityException("Token is not active");
        }

        var userDto = new ModeratorTo();

        userDto.setId(objectMapper.convertValue(tokenClaims.getSubject(), UUID.class));
        userDto.setUsername(objectMapper.convertValue(tokenClaims.get("username"), String.class));

        userDto.setRole(Role.of(objectMapper.convertValue(tokenClaims.get("role"), String.class)));
        return userDto;
    }
}
