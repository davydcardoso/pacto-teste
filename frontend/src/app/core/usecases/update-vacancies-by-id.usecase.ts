import { Observable } from 'rxjs';
import { UpdateVacanciesRequestModule, VacanciesModule } from '../domain/vacancies.module';
import { UseCase } from '../logic/use-cases';
import { VacanciesRepository } from '../repositories/vacancies.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateVacanciesByIdUseCase
  implements
    UseCase<
      { id: string; data: UpdateVacanciesRequestModule },
      VacanciesModule
    >
{
  constructor(private vacanciesRepository: VacanciesRepository) {}

  perform(params: {
    id: string;
    data: UpdateVacanciesRequestModule;
  }): Observable<VacanciesModule> {
    return this.vacanciesRepository.updateVacanciesById(params.id, params.data);
  }
}
