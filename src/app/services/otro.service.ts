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

  // Cada método es más específico que el anterior; y, por eso, lo invoca
  getDocumentSnapshotDeUsuario(): Observable<any> {
    return this.authService.getUserID().pipe(
      switchMap(
          uid => this.usuarioService.getUsuario(uid)
      )
    );
  }

  getDataDeUsuario(): Observable<any> {
    return this.getDocumentSnapshotDeUsuario().pipe(
      map(
        ds => ds.data()
      )
    );
  }

  getRolActual() {
    return this.getDataDeUsuario().pipe(
      map(
        usuario => usuario.rol
      )
    );
  }
}
