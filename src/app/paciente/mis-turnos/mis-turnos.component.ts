import { Component, OnInit } from '@angular/core';
import { map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';
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
  razon: string = '';  
  modoNormal: boolean = true;
  modoCancelar: boolean = false;
  modoRechazar: boolean = false;
  modoReview: boolean = false;
  turnoSeleccionado: any;

  constructor(
    private authService: AuthService,
    private turnoService: TurnoService,
    private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.authService.getAuthState().subscribe(
      u => {
        if(u) {
          this.turnoService
            .getRef()
            .where('paciente.email', '==', u.email) // especialista.id
            // .orderBy('fecha')
            .onSnapshot(
              qs => {
                this.turnosOriginal = [];

                qs.forEach(doc => {
                  const id: string = doc.id;
                  const data: any = doc.data();

                  this.turnosOriginal.push({...data, id});
                });

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
            turno.especialista.nombre.includes(this.filtro) || // paciente.nombre
            turno.especialista.apellido.includes(this.filtro) // paciente.apellido
            ) {
            filtrados.push(turno);
          }
        }
      )

      this.turnos = filtrados.slice();
    }
  }

  cancelarTurnoHandler(turno: any) {
    this.turnoSeleccionado = turno;
    this.modoNormal = false;
    this.modoCancelar = true;
    this.modoRechazar = false;
  }
  cancelarVolverHandler() {
    this.modoNormal = true;
    this.modoCancelar = false;
    this.modoRechazar = false;
  }
  cancelarConfirmarHandler() {
    const nuevoTurno = {
      estado: 'cancelado',
      razon: this.razon
    };

    this.turnoService.actualizar(this.turnoSeleccionado.id, nuevoTurno)
      .then(
        () => this.reservaService.eliminar(this.turnoSeleccionado.especialista.id, this.turnoSeleccionado.fecha)        
      )
      .then(
        () => {
          this.modoNormal = true;
          this.modoCancelar = false;
          this.modoRechazar = false;
        }
      )
  }

  rechazarTurnoHandler(turno: any) {
    
  }
  aceptarTurnoHandler(turno: any) {
    this.turnoService.actualizar(turno.id, {estado: 'aceptado'});
  }
  
  finalizarTurnoHandler(turno: any) {
    
  }
  verReviewHandler(turno: any) {
    
  }

}
