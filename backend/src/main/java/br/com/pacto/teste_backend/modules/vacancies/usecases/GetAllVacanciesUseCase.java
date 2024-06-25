package br.com.pacto.teste_backend.modules.vacancies.usecases;

import br.com.pacto.teste_backend.modules.vacancies.domain.entities.Vacancies;
import br.com.pacto.teste_backend.modules.vacancies.infra.repositories.VacanciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAllVacanciesUseCase {

    @Autowired
    private VacanciesRepository repository;

    public List<Vacancies> perform() {
        List<Vacancies> vacancies = this.repository.findAll();

        for (Vacancies row : vacancies) {
            row.getUsers().removeAll(row.getUsers());
        }

        return vacancies;
    }
}
