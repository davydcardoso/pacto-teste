import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CreateNewUserAccountUseCase } from '../../core/usecases/create-new-user-account.usecase';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public error: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly createNewUserAccount: CreateNewUserAccountUseCase
  ) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.currentUserValue.token) {
      this.router.navigate(['/vacancies']);
    }
  }

  onSubmit() {
    if (
      !this.loginForm.value.name ||
      !this.loginForm.value.email ||
      !this.loginForm.value.password
    ) {
      return;
    }

    this.createNewUserAccount
      .perform({
        name: this.loginForm.value.name,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe(() => {
        alert('Conta criada com sucesso');
        this.router.navigate(['/']);
      });
  }
}
