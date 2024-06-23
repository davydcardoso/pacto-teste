import { Injectable } from '@angular/core';
import {
  UrlTree,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    try {
      const currentUser = this.authService.currentUserValue;

      if (currentUser && currentUser.token && currentUser.user) {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    } catch (err) {
      console.log('Erro ao validar sessão', err);
      return false;
    }
  }
}
