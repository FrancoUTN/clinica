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
  turnosOriginal: any[] = [];
  turnos: any[] = [];
  // uidActual: string = '';
  filtro: string = '';

  constructor(
    private authService: AuthService,
    private turnoService: TurnoService) { }

  ngOnInit(): void {
    this.authService.getAuthState().subscribe(
      u => {
        if(u) {
          this.turnoService
            .getRef()
            .where('especialista.id', '==', u.uid)
            .orderBy('fecha')
            .onSnapshot(
              qs => {
                this.turnosOriginal = [];

                qs.forEach(doc => this.turnosOriginal.push(doc.data()));

                this.turnos = this.turnosOriginal.slice();
              }
            )
        }
      }
    )
  }

  filtrar() {
    if (this.filtro === '') {
      this.turnos = this.turnosOriginal.slice();
    }
    else {
      const filtrados: any[] = [];

      this.turnosOriginal.forEach(
        turno => {
          if(
            turno.especialidad.includes(this.filtro) ||
            turno.paciente.nombre.includes(this.filtro) ||
            turno.paciente.apellido.includes(this.filtro)
            ) {
            filtrados.push(turno);
          }
        }
      )

      this.turnos = filtrados.slice();
    }
  }

  cancelarHandler(turno: any) {

  }
  rechazarHandler(turno: any) {
    
  }
  aceptarHandler(turno: any) {
    
  }
  finalizarHandler(turno: any) {
    
  }
  verReviewHandler(turno: any) {
    
  }

}
