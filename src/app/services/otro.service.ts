import { Injectable } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class OtroService {

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService) { }

  // getUsuarioActual(): Observable<any> {
  //   return this.authService.getAuthState().pipe(
  //     take(1),
  //     switchMap(
  //         u => {
  //             if (u) {
  //                 return this.usuarioService.getUsuario(u.uid)
  //             }
  //             throw Error('No hay usuario.');
  //         }
  //     ),
  //     map(
  //       ds => {
  //         return ds.data()
  //       }
  //     )
  //   );
  // }

  getUsuarioActual(): Observable<any> {
    return this.authService.getUserID().pipe(
      switchMap(
          uid => this.usuarioService.getUsuario(uid)
      ),
      map(
        ds => {
          return ds.data()
        }
      )
    );
  }

  getRolActual() {
    return this.getUsuarioActual().pipe(map(usuario => usuario.rol))
  }

  getUsuarioActualConID(): Observable<any> {
    return this.authService.getUserID()

  }

}
