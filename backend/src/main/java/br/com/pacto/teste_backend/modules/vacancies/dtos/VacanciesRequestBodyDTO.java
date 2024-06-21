package br.com.pacto.teste_backend.modules.vacancies.dtos;

import java.util.List;

public record VacanciesRequestBodyDTO(String title, String description, List<String> requirements) {
}
