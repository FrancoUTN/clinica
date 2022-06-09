import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })

export class AdminGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.getAuthState().pipe(
      take(1),
      map(user => {
        if (user && user.uid === 'PKFu1Rco3qeHaACBbZJc8Jy7IHh1') // Administrador
          return true;

        return this.router.createUrlTree(['page/home']);
      })
    );
  }
}
  