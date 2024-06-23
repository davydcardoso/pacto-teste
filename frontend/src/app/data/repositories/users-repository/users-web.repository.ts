import { Observable } from 'rxjs';
import {
  UserRegisterRequestModule,
  UserLoginRequestModule,
  UserLoginResponseModule,
} from '../../../core/domain/user.module';
import { UserRepository } from '../../../core/repositories/user.repository';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersWebRepository extends UserRepository {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  createNewAccount(data: UserRegisterRequestModule): Observable<void> {
    return this.http
      .post(`${this.apiUrl}/auth/register`, data)
      .pipe((result) => result as unknown as Observable<void>);
  }

  login(data: UserLoginRequestModule): Observable<UserLoginResponseModule> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, data)
      .pipe((result) => result as Observable<UserLoginResponseModule>);
  }
}
