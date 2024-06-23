import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentation/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { VacanciesComponent } from './presentation/vacancies/vacancies.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './presentation/admin/admin.component';
import { RegisterComponent } from './presentation/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'vacancies',
    component: VacanciesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];
