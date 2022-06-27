import { Component, OnInit } from '@angular/core';
import { OtroService } from 'src/app/services/otro.service';
import { TurnoService } from 'src/app/services/turno.service';
import { HistoriaClinica } from 'src/app/models/HistoriaClinica';

@Component({
  selector: 'app-pacientes-turnos',
  templateUrl: './pacientes-turnos.component.html',
  styleUrls: ['./pacientes-turnos.component.scss']
})
export class PacientesTurnosComponent implements OnInit {
  turnosOriginal: any[] = [];
  turnos: any[] = [];
  turnoSeleccionado: any;

  filtro: string = '';

  modoNormal: boolean = true;
  modoReview: boolean = false;

  miRol: string = '';

  constructor(
    private turnoService: TurnoService,
    private otroService: OtroService) { }

  ngOnInit(): void {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe(
      ds => {
        this.miRol = ds.data().rol;

        if (this.miRol === 'administrador') {          
          this.turnoService.getRef()
            .onSnapshot(
              qs => this.cargarTurnos(qs)
            )
        }
        else {
          const miUID = ds.id;
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
              qs => this.cargarTurnos(qs)
            )
        }
      }
    );
  }

  cargarTurnos(qs: any) {
    this.turnosOriginal = [];
    
    qs.forEach((doc:any) => {
      const id: string = doc.id;
      const data: any = doc.data();

      this.turnosOriginal.push({...data, id});
    });

    this.turnos = this.turnosOriginal.slice();
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

  volverHandler() {
    this.modoNormal = true;
    this.modoReview= false;
  }

  verReviewHandler(turno: any) {
    this.turnoSeleccionado = turno;

    this.modoNormal = false;
    this.modoReview = true;
  }

}
