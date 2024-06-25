import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateNewVacanciesUseCase } from '../../core/usecases/create-new-vacancies.usecase';

@Component({
  selector: 'app-modal-create-vacacies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './modal-create-vacacies.component.html',
})
export class ModalCreateVacaciesComponent {
  @Input() vacancyId: string | null = null;
  @Input() isVisible!: boolean;
  @Input() onCloseModal!: (isVisible: boolean) => void;
  public error: string = '';
  public vacanciesForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    requirements: new FormControl(['']),
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly createNewVacancies: CreateNewVacanciesUseCase
  ) {
    this.vacanciesForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      requirements: [[''], Validators.required],
    });
  }

  handleCreateOrEditVacancy() {
    if (
      !this.vacanciesForm.value.title ||
      !this.vacanciesForm.value.description ||
      !this.vacanciesForm.value.requirements
    ) {
      return;
    }

    this.createNewVacancies
      .perform({
        title: this.vacanciesForm.value.title,
        description: this.vacanciesForm.value.description,
        requirements: this.vacanciesForm.value.requirements,
      })
      .subscribe(() => {
        alert('Vaga adicionada com sucesso');
        window.location.reload();
      });
  }

  handleSetValueInRequirimentsForm() {
    const inputRequiments = document.getElementById(
      'requirementInput'
    ) as HTMLInputElement;

    if (!inputRequiments) {
      return;
    }

    const newRequiriment = inputRequiments.value;

    if (!newRequiriment) {
      alert('Favor informe um requisito valido');
      return;
    }

    const existsRequiriment = this.vacanciesForm
      .getRawValue()
      .requirements?.find((item) => item === newRequiriment);

    if (existsRequiriment) {
      alert('Já existe um requisito de vaga cadastrado');
      return;
    }

    let newRequirimentsValue: string[] = [];

    newRequirimentsValue = this.vacanciesForm.getRawValue()
      .requirements as string[];

    newRequirimentsValue.push(newRequiriment);

    this.vacanciesForm.setValue({
      title: this.vacanciesForm.getRawValue().title,
      description: this.vacanciesForm.getRawValue().description,
      requirements: newRequirimentsValue,
    });
  }

  handleRemoveRequiriment(requirement: string) {
    let newRequirimentsValue: string[] = [];

    for (const raw of this.vacanciesForm.getRawValue()?.requirements || []) {
      if (raw !== requirement) {
        newRequirimentsValue.push(raw);
      }
    }

    this.vacanciesForm.setValue({
      title: this.vacanciesForm.getRawValue().title,
      description: this.vacanciesForm.getRawValue().description,
      requirements: newRequirimentsValue,
    });
  }
}
