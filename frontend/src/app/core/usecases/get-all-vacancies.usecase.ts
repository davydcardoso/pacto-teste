import { Observable } from 'rxjs';
import { VacanciesModule } from '../domain/vacancies.module';
import { UseCase } from '../logic/use-cases';
import { VacanciesRepository } from '../repositories/vacancies.repository';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GetAllVacanciesUseCase
  implements UseCase<void, VacanciesModule[]>
{
  constructor(private vacanciesRepository: VacanciesRepository) {}

  perform(params: void): Observable<VacanciesModule[]> {
    return this.vacanciesRepository.getAllVacancies();
  }
}
