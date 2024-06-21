package br.com.pacto.teste_backend.modules.vacancies.infra.repositories;

import br.com.pacto.teste_backend.modules.vacancies.domain.entities.Vacancies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VacanciesRepository extends JpaRepository<Vacancies, UUID> {
    @Query("SELECT v FROM Vacancies v JOIN FETCH v.users")
    List<Vacancies> findAllWithUsers();
}
