import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class OtroService {

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService) { }

  getUsuarioActual() {
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
          return ds.data()
        }
      )
    );
  }

}
