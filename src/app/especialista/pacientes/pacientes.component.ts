import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocUsuario } from 'src/app/models/DocUsuario';
import { Usuario } from 'src/app/models/Usuario';
import { Turno } from 'src/app/models/Turno';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  // usuarios:Array<any> = [];
  docsUsuario: DocUsuario[] = [];
  verHistoriaClinica: boolean = false;
  pacienteSeleccionado!: Usuario;

  miUid!: string;
  turnos!: Turno[];
  verTurnos: boolean = false;
  turnoSeleccionado!: Turno;

  modoNormal: boolean = true;
  modoReview: boolean = false;

  constructor(
    private turnoService: TurnoService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserID().subscribe(
      uid => {
        this.miUid = uid;

        this.turnoService.getRef()
        .where('idEsp', '==', this.miUid)
        .where('estado', '==', 'realizado')
        .get()
        .then(
          qs => {
            qs.forEach(doc => {
              const objeto: any = doc.data();
              const idPaciente = objeto.idPac;
              const paciente = objeto.paciente;

              const some = this.docsUsuario.some(
                auxUsuario => auxUsuario.id == idPaciente
              );

              if (!some) {
                this.docsUsuario.push({id: idPaciente, usuario: paciente});
              }
            });
      })
    })
  }

  usuarioSeleccionadoHandler(docUsuario: DocUsuario) {
    this.turnoService.getRef()
      .where('idEsp', '==', this.miUid)
      .where('idPac', '==', docUsuario.id)
      .where('estado', '==', 'realizado')
      .get()
      .then(
        qs => {
          this.turnos = [];
          qs.forEach(
            doc => {
              const turno: any = doc.data();
              this.turnos.push(turno);
            }
          )
          this.verTurnos = true;
        }
      )
  }

  reviewSeleccionadaHandler(turno: Turno) {
    this.turnoSeleccionado = turno;

    this.modoNormal = false;
    this.modoReview = true;
  }

  volverHandler() {
    this.modoNormal = true;
    this.modoReview= false;
  }
  
  verHistoriaClinicaHandler(turno: Turno) {
    this.turnoSeleccionado = turno;
    this.pacienteSeleccionado = this.turnoSeleccionado.paciente;
    this.verHistoriaClinica = true;
  }

  ocultarHandler() {
    this.verHistoriaClinica = false;
  }
}
