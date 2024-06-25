package br.com.pacto.teste_backend.modules.vacancies.usecases;

import br.com.pacto.teste_backend.modules.users.domain.entities.Users;
import br.com.pacto.teste_backend.modules.vacancies.domain.entities.Vacancies;
import br.com.pacto.teste_backend.modules.vacancies.infra.repositories.VacanciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DeleteVacanciesByIdUseCase {
    @Autowired
    private VacanciesRepository repository;

    public Void perform(String id) {
        Optional<Vacancies> existsVacancies = this.repository.findById(UUID.fromString(id));

        if (existsVacancies.isEmpty()) {
            throw new RuntimeException("O Id informado não pertence a nenhuma vaga cadastrada em nosso sistema");
        }

        existsVacancies.get().getUsers().removeAll(existsVacancies.get().getUsers());

        this.repository.save(existsVacancies.get());

        this.repository.deleteById(UUID.fromString(id));
        return null;
    }
}
