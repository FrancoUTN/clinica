import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocUsuario } from 'src/app/models/docUsuario';
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
    console.log(docUsuario);

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
        }
      )
  }

  // ngOnInit(): void {
  //   this.authService.getUserID().subscribe(
  //     uid => {
  //       this.turnoService.getRef()
  //       .where('idEsp', '==', uid)
  //       .where('estado', '==', 'realizado')
  //       .get()
  //       .then(
  //         qs => {
  //           const auxUsuarios: Array<any> = [];

  //           qs.forEach(doc => {
  //             const objeto: any = doc.data();
  //             const idPaciente = objeto.idPac;
  //             const paciente = objeto.paciente;

  //             const some = auxUsuarios.some(
  //               auxUsuario => auxUsuario.idPac == idPaciente
  //             );

  //             if (!some) {
  //               auxUsuarios.push({idPac: idPaciente, paciente: paciente});
  //             }
  //           });

  //           this.usuarios = auxUsuarios.map(
  //             auxUsuario => auxUsuario.paciente
  //           );
  //     })
  //   })
  // }

  verHistoriaClinicaHandler(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.verHistoriaClinica = true;
  }
  ocultarHandler() {
    this.verHistoriaClinica = false;
  }
}
