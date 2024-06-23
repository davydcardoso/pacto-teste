package br.com.pacto.teste_backend.modules.vacancies.usecases;

import br.com.pacto.teste_backend.modules.users.domain.entities.Users;
import br.com.pacto.teste_backend.modules.users.infra.databases.repositories.UserRepository;
import br.com.pacto.teste_backend.modules.users.service.TokenService;
import br.com.pacto.teste_backend.modules.vacancies.domain.entities.Vacancies;
import br.com.pacto.teste_backend.modules.vacancies.infra.repositories.VacanciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ApplyForVacancyUseCase {
    @Autowired
    private VacanciesRepository vacanciesRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;

    public Vacancies perform(String tokenSession, UUID vacancyId) {

        var subject = this.tokenService.validateToken(tokenSession);
        Users user = this.userRepository.findByEmail(subject);

        Optional<Vacancies> existVacancy = this.vacanciesRepository.findById(vacancyId);

        if (existVacancy.isEmpty()) {
            throw new RuntimeException("Não foi possivel localizar a vaga de emprego informada");
        }

        List<Users> usersInVacancy = existVacancy.get().getUsers();

        for (Users userItem: usersInVacancy) {
            if (userItem.getId() == user.getId()) {
                throw new RuntimeException("Você já se inscreveu pra essa vaga de emprego");
            }
        }

        existVacancy.get().getUsers().add(user);

        return this.vacanciesRepository.save(existVacancy.get());
    }
}
