import { Observable } from 'rxjs';
import {
  CreateVacanciesRequestModule,
  VacanciesModule,
} from '../domain/vacancies.module';
import { UseCase } from '../logic/use-cases';
import { VacanciesRepository } from '../repositories/vacancies.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateNewVacanciesUseCase
  implements UseCase<CreateVacanciesRequestModule, VacanciesModule>
{
  constructor(private vacanciesRepository: VacanciesRepository) {}

  perform(params: CreateVacanciesRequestModule): Observable<VacanciesModule> {
    return this.vacanciesRepository.createNewVacancies(params);
  }
}
