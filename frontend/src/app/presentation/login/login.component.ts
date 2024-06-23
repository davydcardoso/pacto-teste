import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public error: string = '';
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
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
    if (this.loginForm.invalid) {
      return;
    }

    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      console.log('Email ou senha invalidos');
      return;
    }

    this.authService
      .signIn({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe(() => {
        window.location.reload();
      });
  }
}
