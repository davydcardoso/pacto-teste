package br.com.pacto.teste_backend.modules.users.dtos;

import br.com.pacto.teste_backend.modules.users.domain.entities.Role;

public record UserDTO(String name, String email, Role role, String avatar) {
}
