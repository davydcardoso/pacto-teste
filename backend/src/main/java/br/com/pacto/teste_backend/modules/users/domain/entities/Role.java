package br.com.pacto.teste_backend.modules.users.domain.entities;

import lombok.Getter;

@Getter
public enum Role {
    OWNER("admin"),
    ADMINISTRATOR("administrator"),
    CUSTOMER("customer");

    private String role;

    Role(String role) {
        this.role = role;
    }
}
