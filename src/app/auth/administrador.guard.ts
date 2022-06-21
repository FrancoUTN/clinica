import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
  
@Injectable({ providedIn: 'root' })

export class AdministradorGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private usuarioService: UsuarioService,
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
          boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
            return this.authService.getAuthState().pipe(
                take(1),
                switchMap(
                    u => {
                        if (u) {
                            return this.usuarioService.getUsuario(u.uid)
                        }
                        throw Error('No hay usuario.');
                    }
                ),
                map(
                    ds => {
                        const rol = ds.get('rol');

                        if (rol === 'administrador') {
                            return true;
                        }
                        return this.router.createUrlTree([rol]);
                    }
                ),
                catchError(
                    () => of(false)
                )
            );
        }

}
