import { Observable } from 'rxjs';
import {
  CreateVacanciesRequestModule,
  UpdateVacanciesRequestModule,
  VacanciesModule,
  VacanciesWithUsersModule,
} from '../domain/vacancies.module';

export abstract class VacanciesRepository {
  abstract createNewVacancies(
    data: CreateVacanciesRequestModule
  ): Observable<VacanciesModule>;
  abstract getAllVacancies(): Observable<VacanciesModule[]>;
  abstract updateVacanciesById(
    id: string,
    data: UpdateVacanciesRequestModule
  ): Observable<VacanciesModule>;
  abstract deleteVacanciesById(id: string): Observable<void>;
  abstract registerForVacancy(id: string): Observable<void>;
  abstract getVacanciesCompetitors(): Observable<VacanciesWithUsersModule[]>;
  abstract cancelApplicationForJobVacancy(id: string): Observable<void>;
}
