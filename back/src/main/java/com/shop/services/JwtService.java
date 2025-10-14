package com.shop.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.shop.model.userEntity;

@Service
public class JwtService {
    private final JwtEncoder jwtEncoder;

    @Autowired
    private int jwtKeyExpiracy;

    public JwtService(JwtEncoder jwtEncoder){
        this.jwtEncoder = jwtEncoder;
    }

    /**
     * generate a new token for user
     * @param user entity
     * @return a new token
     */
    public String generateToken(userEntity userEntity){
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                                    .issuer("self")
                                    .issuedAt(now)
                                    .expiresAt(now.plus(jwtKeyExpiracy, ChronoUnit.DAYS))
                                    .subject(userEntity.getEmail())
                                    .build();
        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claimsSet);
        return this.jwtEncoder.encode(jwtEncoderParameters).getTokenValue();

    }
}
