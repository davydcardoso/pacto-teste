import {
  ApplicationConfig,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { VacanciesRepository } from './core/repositories/vacancies.repository';
import { VacanciesWebRepository } from './data/repositories/vacancies-repository/vacancies-web.repository';
import { UserRepository } from './core/repositories/user.repository';
import { UsersWebRepository } from './data/repositories/users-repository/users-web.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: UserRepository, useClass: UsersWebRepository },
    { provide: VacanciesRepository, useClass: VacanciesWebRepository },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
