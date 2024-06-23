import { Observable } from 'rxjs';
import { UseCase } from '../logic/use-cases';
import { VacanciesRepository } from '../repositories/vacancies.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeleteVacanciesByIdUseCase implements UseCase<string, void> {
  constructor(private vacanciesRepository: VacanciesRepository) {}

  perform(params: string): Observable<void> {
    return this.vacanciesRepository.deleteVacanciesById(params);
  }
}
