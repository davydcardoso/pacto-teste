package br.com.pacto.teste_backend.modules.users.dtos;

import br.com.pacto.teste_backend.modules.users.domain.entities.Role;

public record RegisterUserRequestDTO(String name, String email, String password, Role role) {
}
