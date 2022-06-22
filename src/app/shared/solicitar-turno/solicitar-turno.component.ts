import { Component, OnInit } from '@angular/core';
import { OtroService } from 'src/app/services/otro.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  especialidades: string[] = ["Nutrición", "Dermatología", "Traumatología"]; // Revisar
  especialistas: any[] = [];

  paso0: boolean = false;
  paso1: boolean = false;
  paso2: boolean = false;
  paso3: boolean = false;
  paso4: boolean = false;
  paso5: boolean = false;

  arrayDeArraysDeFechas: Array<Array<Date|null>> = [];
  idEsp: string = '';
  franjaHoraria: number[] = [];

  pacienteElegido: any;
  especialidadElegida: string = '';
  especialistaElegido: any;
  fechaElegida: Date | null = null;

  usuarioActual: any;
  uid: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private reservaService: ReservaService,
    private turnoService: TurnoService,
    private otroService: OtroService) { }

  ngOnInit(): void {
    // this.otroService.getDocumentSnapshotDeUsuario().subscribe(
    //   ds => {
    //     this.uid = ds.id;
    //     this.usuarioActual = ds.data();
    //   }
    // )
    this.otroService.getDocumentSnapshotDeUsuario().subscribe(
      ds => {
        this.uid = ds.id;
        this.usuarioActual = ds.data();

        if (this.usuarioActual.rol === 'paciente') {
          this.paso1 = true;
        }
        else if (this.usuarioActual.rol === 'administrador') {
          this.paso1 = true;

        }
      }
    )

    for(let i = 8; i < 19; i++)
      this.franjaHoraria.push(i);
  }

  rellenarHorarios() {
    const reservas: number[] = [];
    
    this.reservaService.getRef().where("uid", "==", this.idEsp).get().then(
      qs => qs.forEach(
        doc => reservas.push(doc.get("fecha").toDate().valueOf())
      )
    )
    .then(
      () => {
        for(let i = 0; i < 15; i++) {
          const fecha = new Date();
          fecha.setDate(fecha.getDate() + i);
          this.arrayDeArraysDeFechas.push([]);

          const dia = fecha.getDay();
          const horas = dia !== 6 ? 19 : 14;

          if(dia !== 0) {
            for(let j = 8; j < horas; j++) {
              const nuevaFecha = new Date(fecha);
              nuevaFecha.setHours(j, 0, 0, 0);

              if (reservas.indexOf(nuevaFecha.valueOf()) < 0) {
                this.arrayDeArraysDeFechas[i].push(nuevaFecha);
              }
              else {
                // Sirve para generar el <td> vacío,
                // pero quizá sea mejor manejarlo en el template
                this.arrayDeArraysDeFechas[i].push(null);
              }
            }
          }
        }
      }
    )

  }

  onEspecialidadSeleccionadaHandler(especialidad: string) {
    this.especialidadElegida = especialidad;

    this.usuarioService
      .getUsuariosRef()
      .where('rol', '==', 'especialista')
      .where('especialidades', 'array-contains', this.especialidadElegida)
      .get()
      .then(
        qs => {
          qs.forEach(
            doc => {              
              const obj:any = {
                id: doc.id,
                data: doc.data()
              }

              this.especialistas.push(obj);
            }
          )
          this.paso1 = false;
          this.paso2 = true;
        }
      )
  }

  onEspecialistaSeleccionadoHandler(especialista: any) {
    this.paso2 = false;
    this.paso3 = true;

    this.especialistaElegido = especialista.data;
    this.idEsp = especialista.id;

    this.rellenarHorarios();
  }

  onFechaSeleccionadaHandler(fecha: Date) {
    this.paso3 = false;
    this.paso4 = true;

    this.fechaElegida = fecha;
  }

  onCancelarReservaHandler() {
    this.paso3 = true;
    this.paso4 = false;

    this.fechaElegida = null;
  }

  onConfirmarReservaHandler() {
    if (this.fechaElegida) {
      this.reservaService.add(this.idEsp, this.fechaElegida).then(
        () => this.agregarTurno()
      );
    }
  }

  agregarTurno() {
    if (this.usuarioActual.rol === 'paciente') {
      this.pacienteElegido = this.usuarioActual;
    }

    const turno = {
      idPac: this.uid,
      paciente: this.pacienteElegido,
      idEsp: this.idEsp,
      especialista: this.especialistaElegido,
      fecha: this.fechaElegida,
      especialidad: this.especialidadElegida,
      estado: 'reservado'
    }

    this.turnoService.add(turno).then(
      () => {
        this.paso4 = false;
        this.paso5 = true;
      }
    )

  }

}
