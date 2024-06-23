import { Component, OnInit } from '@angular/core';
import { VacanciesModule } from '../../core/domain/vacancies.module';
import { GetAllVacanciesUseCase } from '../../core/usecases/get-all-vacancies.usecase';
import { VacanciesWebRepository } from '../../data/repositories/vacancies-repository/vacancies-web.repository';
import { CommonModule } from '@angular/common';
import { NavmenuComponent } from '../../components/navmenu/navmenu.component';
import { RegisterForVacancyUseCase } from '../../core/usecases/register-for-vacancy.usecase';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  providers: [],
  templateUrl: './vacancies.component.html',
  imports: [CommonModule, NavmenuComponent],
})
export class VacanciesComponent implements OnInit {
  vacancies: Array<VacanciesModule>;

  constructor(
    private readonly getAllVacancie: GetAllVacanciesUseCase,
    private readonly registerForVacancy: RegisterForVacancyUseCase
  ) {
    this.vacancies = [];
  }

  ngOnInit(): void {
    this.getAllVacancie.perform().subscribe((result) => {
      this.vacancies = result;
    });
  }

  handleSubscriptionToVacancy(id: string) {
    this.registerForVacancy.perform(id).subscribe((result) => {
      alert('Candidatura realizada com sucesso');
    });
  }
}
