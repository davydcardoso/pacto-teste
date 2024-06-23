import { Observable } from 'rxjs';
import { UserRegisterRequestModule } from '../domain/user.module';
import { UseCase } from '../logic/use-cases';
import { UserRepository } from '../repositories/user.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateNewUserAccountUseCase
  implements UseCase<UserRegisterRequestModule, void>
{
  constructor(private readonly userRepository: UserRepository) {}

  perform(params: UserRegisterRequestModule): Observable<void> {
    return this.userRepository.createNewAccount(params);
  }
}
