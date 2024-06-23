import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavmenuComponent } from '../../components/navmenu/navmenu.component';
import { VacanciesWithUsersModule } from '../../core/domain/vacancies.module';
import { GetVacanciesCompetitorsUseCase } from '../../core/usecases/get-vacancies-competitors.usecase';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [NavmenuComponent, CommonModule],
})
export class AdminComponent implements OnInit {
  public vacanciesWithUsers: VacanciesWithUsersModule[];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly getVacanciesCompetitors: GetVacanciesCompetitorsUseCase
  ) {
    this.vacanciesWithUsers = [];
  }

  ngOnInit(): void {
    if (this.authService.currentUserValue.user.role !== 'ADMINISTRATOR') {
      alert('Você não tem permissão para acessar está pagina');
      this.router.navigate(['/vacancies']);
      return;
    }

    this.getVacanciesCompetitors.perform().subscribe((result) => {
      console.log(result);
      this.vacanciesWithUsers = result;
    });
  }
}
