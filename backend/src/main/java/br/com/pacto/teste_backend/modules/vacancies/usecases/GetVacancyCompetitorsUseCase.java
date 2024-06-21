package br.com.pacto.teste_backend.modules.vacancies.usecases;

import br.com.pacto.teste_backend.modules.vacancies.infra.repositories.VacanciesRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class GetVacancyCompetitorsUseCase {
    @Autowired
    private VacanciesRepository vacanciesRepository;

    public Object perform(String vacancyId){
        return null;
    }

}
