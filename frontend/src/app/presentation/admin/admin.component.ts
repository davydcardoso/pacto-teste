import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavmenuComponent } from '../../components/navmenu/navmenu.component';
import { VacanciesWithUsersModule } from '../../core/domain/vacancies.module';
import { GetVacanciesCompetitorsUseCase } from '../../core/usecases/get-vacancies-competitors.usecase';
import { CommonModule } from '@angular/common';
import { ModalCompetitorsComponent } from '../../components/modal-competitors/modal-competitors.component';
import { LeftAdminMenuComponent } from "../../components/left-admin-menu/left-admin-menu.component";

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    imports: [NavmenuComponent, CommonModule, ModalCompetitorsComponent, LeftAdminMenuComponent]
})
export class AdminComponent implements OnInit {
  public isModalCompetitorsVisible: boolean = false;
  public selectedVacancy: VacanciesWithUsersModule | null = null;
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
      this.vacanciesWithUsers = result;
    });
  }

  handelOpenModalCompetitors(vacancyId: string) {
    const selectedVacancy = this.vacanciesWithUsers.find(
      (item) => item.id === vacancyId
    );

    if (!selectedVacancy) {
      return;
    }

    this.selectedVacancy = selectedVacancy;
    this.isModalCompetitorsVisible = !this.isModalCompetitorsVisible;
  }
}
