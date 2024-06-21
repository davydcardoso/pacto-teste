package br.com.pacto.teste_backend.modules.vacancies.dtos;

import java.util.Date;
import java.util.List;

public record VacanciesDTO(String title, String description, List<String> requirements, Date createdAt) {
}
