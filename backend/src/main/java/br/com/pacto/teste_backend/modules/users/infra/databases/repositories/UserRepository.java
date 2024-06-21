package br.com.pacto.teste_backend.modules.users.infra.databases.repositories;

import br.com.pacto.teste_backend.modules.users.domain.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<Users, UUID> {
    Users findByEmail(String email);
}