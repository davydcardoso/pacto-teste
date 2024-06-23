import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import {
  UserLoginRequestModule,
  UserLoginResponseModule,
  UserModule,
} from '../core/domain/user.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<UserModule>;
  private currentTokenSubject: BehaviorSubject<string>;
  private currentUser: Observable<UserModule>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('@pacto:user') || '{}')
    );

    this.currentTokenSubject = new BehaviorSubject<string>(
      localStorage.getItem('@pacto:token') || ''
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): { user: UserModule; token: string } {
    return {
      user: this.currentUserSubject.value,
      token: this.currentTokenSubject.value,
    };
  }

  signIn(data: UserLoginRequestModule): Observable<UserLoginResponseModule> {
    console.log('SignIn: ', `${this.apiURL}/login`);
    return this.http
      .post<UserLoginResponseModule>(`${this.apiURL}/login`, data)
      .pipe(
        map((requestResult) => {
          console.log(requestResult);
          localStorage.setItem('@pacto:token', requestResult.token);
          localStorage.setItem(
            '@pacto:user',
            JSON.stringify(requestResult.user)
          );

          this.currentUserSubject.next(requestResult.user);

          this.router.navigate(['/vacancies']);

          return requestResult;
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';

          console.log(errorMsg);

          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          return throwError(errorMsg);
        })
      );
  }

  signOut(): void {
    localStorage.removeItem('@pacto:token');
    localStorage.removeItem('@pacto:user');

    this.currentUserSubject.next({} as any);
    this.currentTokenSubject.next('');

    this.router.navigate(['']);
  }
}
