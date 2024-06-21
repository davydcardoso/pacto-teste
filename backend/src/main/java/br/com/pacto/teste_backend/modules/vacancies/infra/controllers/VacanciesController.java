package br.com.pacto.teste_backend.modules.vacancies.infra.controllers;

import br.com.pacto.teste_backend.core.domain.FormatHttpExeptions;
import br.com.pacto.teste_backend.modules.vacancies.dtos.VacanciesRequestBodyDTO;
import br.com.pacto.teste_backend.modules.vacancies.usecases.CreateVacanciesUseCase;
import br.com.pacto.teste_backend.modules.vacancies.usecases.DeleteVacanciesByIdUseCase;
import br.com.pacto.teste_backend.modules.vacancies.usecases.GetAllVacanciesUseCase;
import br.com.pacto.teste_backend.modules.vacancies.usecases.UpdatedVacanciesUseCase;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vacancies")
public class VacanciesController {

    @Autowired
    private FormatHttpExeptions httpExeptions;
    @Autowired
    private GetAllVacanciesUseCase getAllVacanciesUseCase;
    @Autowired
    private CreateVacanciesUseCase createVacanciesUseCase;
    @Autowired
    private UpdatedVacanciesUseCase updatedVacanciesUseCase;
    @Autowired
    private DeleteVacanciesByIdUseCase deleteVacanciesByIdUseCase;

    @GetMapping()
    public ResponseEntity getAll() {
        try {
            return ResponseEntity.ok(this.getAllVacanciesUseCase.perform());
        }catch (Exception exception) {
            return ResponseEntity.badRequest().body(this.httpExeptions.runException(exception));
        }
    }

    @PostMapping()
    public ResponseEntity create(@RequestBody @Valid VacanciesRequestBodyDTO body) {
        try {
            return ResponseEntity.status(201).body(this.createVacanciesUseCase.perform(body));
        }catch (Exception exception) {
            return ResponseEntity.badRequest().body(this.httpExeptions.runException(exception));
        }
    }

    @PutMapping()
    public ResponseEntity toUpdate(@RequestParam("id") String id, @RequestBody VacanciesRequestBodyDTO body) {
        try {
            return ResponseEntity.ok(this.updatedVacanciesUseCase.perform(id, body));
        }catch (Exception exception) {
            return ResponseEntity.badRequest().body(this.httpExeptions.runException(exception));
        }
    }

    @DeleteMapping()
    public ResponseEntity delete(@RequestParam("id") String id) {
        try {
            return ResponseEntity.ok(this.deleteVacanciesByIdUseCase.perform(id));
        }catch (Exception exception) {
            return ResponseEntity.badRequest().body(this.httpExeptions.runException(exception));
        }
    }

}
