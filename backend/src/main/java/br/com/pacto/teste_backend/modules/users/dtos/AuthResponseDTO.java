package br.com.pacto.teste_backend.modules.users.dtos;

import br.com.pacto.teste_backend.modules.users.domain.entities.Users;

public record AuthResponseDTO(String token, UserDTO user) {
}
