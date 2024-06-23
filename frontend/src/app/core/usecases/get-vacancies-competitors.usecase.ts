import { Observable } from 'rxjs';
import { VacanciesWithUsersModule } from '../domain/vacancies.module';
import { UseCase } from '../logic/use-cases';
import { VacanciesRepository } from '../repositories/vacancies.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetVacanciesCompetitorsUseCase
  implements UseCase<void, VacanciesWithUsersModule[]>
{
  constructor(private vacanciesRepository: VacanciesRepository) {}

  perform(params: void): Observable<VacanciesWithUsersModule[]> {
    return this.vacanciesRepository.getVacanciesCompetitors();
  }
}
