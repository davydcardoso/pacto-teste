package br.com.pacto.teste_backend.modules.vacancies.usecases;

import br.com.pacto.teste_backend.modules.vacancies.domain.entities.Vacancies;
import br.com.pacto.teste_backend.modules.vacancies.dtos.VacanciesRequestBodyDTO;
import br.com.pacto.teste_backend.modules.vacancies.infra.repositories.VacanciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CreateVacanciesUseCase {
    @Autowired
    private VacanciesRepository repository;

    public Vacancies perform(VacanciesRequestBodyDTO data) {
        if (data.title() == null || data.title().trim().length()< 5 || data.title().trim().length()>255) {
            throw new RuntimeException("Titulo da vaga informado não é valido");
        }

        if (data.description() == null || data.description().trim().length()<5 || data.description().trim().length()>255) {
            throw new RuntimeException("Descrição da vaga informado não é valida");
        }

        Vacancies newVacancies = new Vacancies(
                data.title(),
                data.description(),
                data.requirements(),
                new Date()
        );

        return this.repository.save(newVacancies);
    }
}
