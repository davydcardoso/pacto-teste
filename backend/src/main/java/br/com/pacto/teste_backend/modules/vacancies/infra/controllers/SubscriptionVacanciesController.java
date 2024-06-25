package br.com.pacto.teste_backend.modules.vacancies.infra.controllers;


import br.com.pacto.teste_backend.core.domain.FormatHttpExeptions;
import br.com.pacto.teste_backend.modules.vacancies.usecases.ApplyForVacancyUseCase;
import br.com.pacto.teste_backend.modules.vacancies.usecases.CancelApplicationForJobVacancyUseCase;
import br.com.pacto.teste_backend.modules.vacancies.usecases.ConsultVacanciesAndCandidatesUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.UUID;

@RestController
@RequestMapping("/vacancies/subscriptions")
public class SubscriptionVacanciesController {

    @Autowired
    private FormatHttpExeptions httpExeptions;
    @Autowired
    private ApplyForVacancyUseCase applyForVacancyUseCase;
    @Autowired
    private ConsultVacanciesAndCandidatesUseCase consultVacanciesAndCandidatesUseCase;
    @Autowired
    private CancelApplicationForJobVacancyUseCase cancelApplicationForJobVacancyUseCase;

    @GetMapping("/competitors")
    public ResponseEntity getCompetitors(@RequestHeader HashMap<String, String> headers) {
        try {
            return ResponseEntity.ok().body(this.consultVacanciesAndCandidatesUseCase.perform());
        }catch (Exception exception) {
            return ResponseEntity.badRequest().body(this.httpExeptions.runException(exception));
        }
    }

    @PutMapping()
    public ResponseEntity applyForVacancy(@RequestParam("id") String vacancyId, @RequestHeader HashMap<String, String> headers) {
        try {
            String bearerToken = headers.get("authorization");

            if (bearerToken == null) {
                throw new RuntimeException("Unauthorized");
            }

            String token = bearerToken.replace("Bearer", "").trim();

            this.applyForVacancyUseCase.perform(token, UUID.fromString(vacancyId));

            return ResponseEntity.ok().build();
        }catch (Exception exception) {
            return ResponseEntity.badRequest().body(this.httpExeptions.runException(exception));
        }
    }

    @DeleteMapping()
    public ResponseEntity cancelSubuscription(@RequestParam("id") String vacancyId, @RequestHeader HashMap<String, String> headers) {
        try {
            String bearerToken = headers.get("authorization");

            if (bearerToken == null) {
                throw new RuntimeException("Unauthorized");
            }

            String token = bearerToken.replace("Bearer", "").trim();

            this.cancelApplicationForJobVacancyUseCase.perform(token, UUID.fromString(vacancyId));

            return ResponseEntity.ok().build();
        }catch (Exception exception) {
            return ResponseEntity.badRequest().body(this.httpExeptions.runException(exception));
        }
    }
}
