package br.com.pacto.teste_backend.modules.vacancies.usecases;

import br.com.pacto.teste_backend.modules.vacancies.domain.entities.Vacancies;
import br.com.pacto.teste_backend.modules.vacancies.infra.repositories.VacanciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultVacanciesAndCandidatesUseCase {
    @Autowired
    private VacanciesRepository vacanciesRepository;

    public List<Vacancies> perform() {
        return this.vacanciesRepository.findAllWithUsers();
    }
}
