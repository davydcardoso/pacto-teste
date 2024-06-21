package br.com.pacto.teste_backend.modules.vacancies.usecases;

import br.com.pacto.teste_backend.modules.vacancies.domain.entities.Vacancies;
import br.com.pacto.teste_backend.modules.vacancies.dtos.VacanciesRequestBodyDTO;
import br.com.pacto.teste_backend.modules.vacancies.infra.repositories.VacanciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class UpdatedVacanciesUseCase {
    @Autowired
    private VacanciesRepository repository;

    public Vacancies perform(String id, VacanciesRequestBodyDTO data) {
        if (data.title() == null || data.title().trim().length()< 5 || data.title().trim().length()>255) {
            throw new RuntimeException("Titulo da vaga informado não é valido");
        }

        if (data.description() == null || data.description().trim().length()<5 || data.description().trim().length()>255) {
            throw new RuntimeException("Descrição da vaga informado não é valida");
        }

        Optional<Vacancies> existsVacancie = this.repository.findById(UUID.fromString(id));

        if (existsVacancie.isEmpty()) {
            throw new RuntimeException("A vaga informada não foi encontrada em nosso sistema");
        }

        Vacancies newVacancies = new Vacancies(
                existsVacancie.get().getId(),
                data.title(),
                data.description(),
                data.requirements(),
                existsVacancie.get().getCreatedAt(),
                new Date()
        );

        return this.repository.save(newVacancies);
    }
}
