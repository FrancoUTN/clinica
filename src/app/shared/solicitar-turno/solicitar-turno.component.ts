import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/models/Especialidad';
import { Usuario } from 'src/app/models/Usuario';
import { animaciones } from 'src/app/others/animaciones';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { OtroService } from 'src/app/services/otro.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss'],
  animations: animaciones
})
export class SolicitarTurnoComponent implements OnInit {
  especialidades: Especialidad[] = [];

  especialistas: any[] = [];
  pacientes: any[] = [];

  paso0: boolean = false;
  paso1: boolean = false;
  paso2: boolean = false;
  paso3: boolean = false;
  paso4: boolean = false;
  paso5: boolean = false;

  arrayDeArraysDeFechas: Array<Array<Date|null>> = [];
  idEsp: string = '';
  idPac: string = '';
  franjaHoraria: number[] = [];

  pacienteElegido: any;
  especialidadElegida: string = '';
  especialistaElegido!: Usuario;
  fechaElegida: Date | null = null;

  usuarioActual: any;
  uid: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private reservaService: ReservaService,
    private turnoService: TurnoService,
    private otroService: OtroService,
    private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe(
      ds => {
        this.uid = ds.id;
        this.usuarioActual = ds.data();

        if (this.usuarioActual.rol === 'paciente') {
          this.paso1 = true;
        }
        else if (this.usuarioActual.rol === 'administrador') {
          this.paso0 = true;

          this.usuarioService.getUsuariosRef().where('rol', '==', 'paciente').get()
            .then(
              qs => {
                qs.forEach(
                  doc => {              
                    const obj:any = {
                      id: doc.id,
                      data: doc.data()
                    }

                    this.pacientes.push(obj);
                  }
                )
              }
            )
        }
      }
    );

    this.especialidadService.getEspecialidades().subscribe(
      qs => qs.forEach(
        qds => {
          const esp: any = qds.data();
          this.especialidades.push(esp);
        }
      )
    );

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

          if (this.especialistaElegido.agenda) {
            if (this.especialistaElegido.agenda[dia]) {
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
      }
    )
  }

  onPacienteSeleccionadoHandler(paciente: any) {
    this.paso0 = false;
    this.paso1 = true;

    this.pacienteElegido = paciente.data;
    this.idPac = paciente.id;
  }

  onEspecialidadSeleccionadaHandler(especialidad: Especialidad) {
    this.especialidadElegida = especialidad.nombre;

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
      this.idPac = this.uid;
    }

    const turno = {
      idPac: this.idPac,
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

  regresar() {
    if (this.usuarioActual.rol === 'paciente') {
      this.router.navigateByUrl('/paciente/mis-turnos');
    }
    else if (this.usuarioActual.rol === 'administrador') {
      this.router.navigateByUrl('/administrador/turnos');
    }
  }

}
