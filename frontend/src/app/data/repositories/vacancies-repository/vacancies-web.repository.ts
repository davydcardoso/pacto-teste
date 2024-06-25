import { Injectable } from '@angular/core';
import { VacanciesRepository } from '../../../core/repositories/vacancies.repository';
import { Observable, map, pipe } from 'rxjs';
import {
  CreateVacanciesRequestModule,
  VacanciesModule,
  UpdateVacanciesRequestModule,
  VacanciesWithUsersModule,
} from '../../../core/domain/vacancies.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class VacanciesWebRepository extends VacanciesRepository {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  createNewVacancies(
    data: CreateVacanciesRequestModule
  ): Observable<VacanciesModule> {
    return this.http
      .post(`${this.apiUrl}/vacancies`, data, {
        headers: {
          Authorization: `Bearer ${this.authService.currentUserValue.token}`,
        },
      })
      .pipe((result) => result as unknown as Observable<VacanciesModule>);
  }
  getAllVacancies(): Observable<VacanciesModule[]> {
    return this.http
      .get(`${this.apiUrl}/vacancies`, {
        headers: {
          Authorization: `Bearer ${this.authService.currentUserValue.token}`,
        },
      })
      .pipe((result) => result as Observable<VacanciesModule[]>);
  }
  updateVacanciesById(
    id: string,
    data: UpdateVacanciesRequestModule
  ): Observable<VacanciesModule> {
    throw new Error('Method not implemented.');
  }
  deleteVacanciesById(id: string): Observable<void> {
    return this.http
      .delete(`${this.apiUrl}/vacancies?id=${id}`, {
        headers: {
          Authorization: `Bearer ${this.authService.currentUserValue.token}`,
        },
      })
      .pipe((result) => result as unknown as Observable<void>);
  }
  registerForVacancy(id: string): Observable<void> {
    return this.http
      .put(
        `${this.apiUrl}/vacancies/subscriptions?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentUserValue.token}`,
          },
        }
      )
      .pipe((result) => result as any);
  }
  getVacanciesCompetitors(): Observable<VacanciesWithUsersModule[]> {
    return this.http
      .get(`${this.apiUrl}/vacancies/subscriptions/competitors`, {
        headers: {
          Authorization: `Bearer ${this.authService.currentUserValue.token}`,
        },
      })
      .pipe((result) => result as Observable<VacanciesWithUsersModule[]>);
  }
  cancelApplicationForJobVacancy(id: string): Observable<void> {
    return this.http
      .delete(`${this.apiUrl}/vacancies/subscriptions?id=${id}`, {
        headers: {
          Authorization: `Bearer ${this.authService.currentUserValue.token}`,
        },
      })
      .pipe((result) => result as unknown as Observable<void>);
  }
}
