import { Observable } from 'rxjs';
import {
  UserLoginRequestModule,
  UserLoginResponseModule,
  UserRegisterRequestModule,
} from '../domain/user.module';

export abstract class UserRepository {
  abstract createNewAccount(data: UserRegisterRequestModule): Observable<void>;
  abstract login(
    data: UserLoginRequestModule
  ): Observable<UserLoginResponseModule>;
}
