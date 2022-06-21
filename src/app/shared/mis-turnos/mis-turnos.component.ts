import { Component, OnInit } from '@angular/core';
import { OtroService } from 'src/app/services/otro.service';
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
  turnoSeleccionado: any;

  filtro: string = '';
  // razon: string = '';

  modoNormal: boolean = true;
  modoCancelar: boolean = false;
  modoRechazar: boolean = false;
  modoReview: boolean = false;
  modoFinalizar: boolean = false;

  miRol: string = '';

  constructor(
    private turnoService: TurnoService,
    private reservaService: ReservaService,
    private otroService: OtroService) { }

  ngOnInit(): void {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe(
      ds => {
        const miUID = ds.id;
        this.miRol = ds.data().rol;

        let idTipo = '';

        if (this.miRol === 'paciente') {
          idTipo = 'idPac';
        }
        else if (this.miRol === 'especialista') {
          idTipo = 'idEsp';
        }

        this.turnoService.getRef()
          .where(idTipo, '==', miUID)
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
    );

  }

  // filtrar() {
  pacienteFiltrar() {
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
  especialistaFiltrar() {
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
  cancelarConfirmarHandler(razon: string) {
    const nuevoTurno = {
      estado: 'cancelado',
      razon: razon
    };

    this.turnoService.actualizar(this.turnoSeleccionado.id, nuevoTurno)
      .then(
        () => this.reservaService.eliminar(this.turnoSeleccionado.idEsp, this.turnoSeleccionado.fecha)        
      )
      .then(
        () => {
          this.modoNormal = true;
          this.modoCancelar = false;
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

  volverHandler() {
    this.modoNormal = true;
    this.modoCancelar = false;
    this.modoRechazar = false;
    this.modoFinalizar = false;
  }
}
