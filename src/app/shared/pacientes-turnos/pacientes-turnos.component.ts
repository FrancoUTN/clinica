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
  filtro: string = '';

  modoNormal: boolean = true;
  modoReview: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.turnosOriginal = this.turnos;
  }

  filtrar() {
    if (this.filtro === '') {
      this.turnos = this.turnosOriginal.slice();
    }
    else {
      const filtrados: any[] = [];

      this.turnosOriginal.forEach(
        turno => {
          if(turno.especialidad.includes(this.filtro)) {
            filtrados.push(turno);
          }
          // else if (turno.paciente.historiaClinica) {
          //   const hc: Object = turno.paciente.historiaClinica;
          //   let existe: boolean = false;

          //   hc.forEach(
          //     (dato: string) => {
          //       if (dato.includes(this.filtro)) {
          //         existe = true;
          //       }
          //     }
          //   );
          //   if (existe) {
          //     filtrados.push(turno);
          //   }
          // }
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
    this.reviewSeleccionada.emit(turno);
  }

}
