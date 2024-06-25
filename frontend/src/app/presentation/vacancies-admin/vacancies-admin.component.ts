import { Component, OnInit } from '@angular/core';
import { NavmenuComponent } from '../../components/navmenu/navmenu.component';
import { LeftAdminMenuComponent } from '../../components/left-admin-menu/left-admin-menu.component';
import { CommonModule } from '@angular/common';
import { VacanciesModule } from '../../core/domain/vacancies.module';
import { GetAllVacanciesUseCase } from '../../core/usecases/get-all-vacancies.usecase';
import { DeleteVacanciesByIdUseCase } from '../../core/usecases/delete-vacancies-by-id.usecase';
import { ModalCreateVacaciesComponent } from '../../components/modal-create-vacacies/modal-create-vacacies.component';

@Component({
  selector: 'app-vacancies-admin',
  standalone: true,
  templateUrl: './vacancies-admin.component.html',
  imports: [
    NavmenuComponent,
    LeftAdminMenuComponent,
    CommonModule,
    ModalCreateVacaciesComponent,
  ],
})
export class VacanciesAdminComponent implements OnInit {
  vacancies: Array<VacanciesModule>;
  public modalCreateVacanciesVisible!: boolean;

  constructor(
    private readonly getAllVacancie: GetAllVacanciesUseCase,
    private readonly deleteVacacyById: DeleteVacanciesByIdUseCase
  ) {
    this.vacancies = [];
  }

  ngOnInit(): void {
    this.getAllVacancie.perform().subscribe((result) => {
      this.vacancies = result;
    });
  }

  handleDeleteVacancyById(vacancyId: string) {
    this.deleteVacacyById.perform(vacancyId).subscribe(() => {
      alert('A vaga de emprego foi excluida com sucesso');

      window.location.reload();
    });
  }

  handleVisibilityModalCreateVacancies() {
    console.log('Fechando form');

    console.log('Valor Anterior', this.modalCreateVacanciesVisible);
    this.modalCreateVacanciesVisible = !this.modalCreateVacanciesVisible;
    console.log('Novo Valor', this.modalCreateVacanciesVisible);
  }
}
