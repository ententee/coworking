package com.ententee.coworking.auth;

import com.ententee.coworking.entities.User;
import com.ententee.coworking.users.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    public record LoginResponse(boolean success, String token) {
        public static final LoginResponse Failed = new LoginResponse(false, null);
    }

    private final UserRepository userRepository;
    private final JwtEncoder jwtEncoder;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtEncoder jwtEncoder, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtEncoder = jwtEncoder;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(String username, String password) {
        Optional<User> maybeUser = userRepository.findByUsername(username);
        if (maybeUser.isEmpty()) {
            return LoginResponse.Failed;
        }

        User user = maybeUser.get();
        boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
        if (!passwordMatches) {
            return LoginResponse.Failed;
        }

        return new LoginResponse(true, generateToken(user));
    }

    private String generateToken(User user) {
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .claim("userId", user.getUserId())
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}
