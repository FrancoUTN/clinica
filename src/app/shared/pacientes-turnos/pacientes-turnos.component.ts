import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OtroService } from 'src/app/services/otro.service';
import { TurnoService } from 'src/app/services/turno.service';
import { HistoriaClinica } from 'src/app/models/HistoriaClinica';
import { Turno } from 'src/app/models/Turno';

@Component({
  selector: 'app-pacientes-turnos',
  templateUrl: './pacientes-turnos.component.html',
  styleUrls: ['./pacientes-turnos.component.scss']
})
export class PacientesTurnosComponent implements OnInit {
  @Input() turnos!: Turno[];
  @Output() reviewSeleccionada = new EventEmitter();
  @Output() historiaClinicaSeleccionada = new EventEmitter();

  turnosOriginal!: Turno[];
  // turnos: any[] = [];
  turnoSeleccionado!: Turno;

  filtro: string = '';

  modoNormal: boolean = true;
  modoReview: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // filtrar() {
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

  verReview(turno: Turno) {
    // this.turnoSeleccionado = turno;

    // this.modoNormal = false;
    // this.modoReview = true;

    this.reviewSeleccionada.emit(turno);
  }

}
