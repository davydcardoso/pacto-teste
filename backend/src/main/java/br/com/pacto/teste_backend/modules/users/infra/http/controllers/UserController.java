package br.com.pacto.teste_backend.modules.users.infra.http.controllers;

import br.com.pacto.teste_backend.modules.users.domain.entities.Users;
import br.com.pacto.teste_backend.modules.users.infra.databases.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    public List<Users> getUsers() {
        return userRepository.findAll();
    }

}
