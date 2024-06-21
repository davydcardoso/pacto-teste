package br.com.pacto.teste_backend.modules.users.infra.http.controllers;

import br.com.pacto.teste_backend.modules.users.domain.entities.Role;
import br.com.pacto.teste_backend.modules.users.domain.entities.Users;
import br.com.pacto.teste_backend.modules.users.dtos.AuthRequestDTO;
import br.com.pacto.teste_backend.modules.users.dtos.AuthResponseDTO;
import br.com.pacto.teste_backend.modules.users.dtos.RegisterUserRequestDTO;
import br.com.pacto.teste_backend.modules.users.dtos.UserDTO;
import br.com.pacto.teste_backend.modules.users.infra.databases.repositories.UserRepository;
import br.com.pacto.teste_backend.modules.users.service.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthRequestDTO body) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(body.email(), body.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = this.tokenService.generateSessionToken((Users) auth.getPrincipal());

        Users user =(Users)  auth.getPrincipal();

        return ResponseEntity.ok(
                new AuthResponseDTO(
                        token,
                        new UserDTO(user.getName(), user.getEmail(), user.getRole(), user.getAvatar())
                )
        );
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterUserRequestDTO body) {
        if (this.userRepository.findByEmail(body.email()) != null) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(body.password());

        Users newUser = new Users(
                body.name(),
                body.email(),
                encryptedPassword,
                Role.CUSTOMER
        );

        this.userRepository.save(newUser);

        return ResponseEntity.status(201).build();
    }
}
