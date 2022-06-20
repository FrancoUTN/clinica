import { Component, OnInit } from '@angular/core';
import { map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {
  turnos: any[] = [];
  uidActual: string = '';

  constructor(
    private authService: AuthService,
    private turnoService: TurnoService) { }

  ngOnInit(): void {
    // this.authService.getAuthState().pipe(
    //   take(1),
    //   switchMap(
    //       u => {
    //           if(u) {
    //             return this.turnoService.getRef().where('especialista.id', '==', u.uid).get()
    //           }
    //           throw Error('No hay usuario.');
    //       }
    //   )
    // ).subscribe(
    //   qs => qs.forEach(
    //     doc => this.turnos.push(doc.data())
    //   )
    // )

    this.authService.getAuthState().subscribe(
      u => {
        if(u) {
          this.turnoService
            .getRef()
            .where('especialista.id', '==', u.uid)
            .orderBy('fecha')
            .onSnapshot(
              qs => {
                this.turnos = [];

                qs.forEach(doc => this.turnos.push(doc.data()))
              }
            )
        }
      }
    )

  }


}
