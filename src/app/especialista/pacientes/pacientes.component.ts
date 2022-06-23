import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  usuarios:Array<any> = [];
  verHistoriaClinica: boolean = false;
  pacienteSeleccionado: any;

  constructor(
    private turnoService: TurnoService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserID().subscribe(
      uid => {
        this.turnoService.getRef()
        .where('idEsp', '==', uid)
        .where('estado', '==', 'realizado')
        .get()
        .then(
          qs => {
            const auxUsuarios: Array<any> = [];

            qs.forEach(doc => {
              const objeto: any = doc.data();
              const idPaciente = objeto.idPac;
              const paciente = objeto.paciente;

              const some = auxUsuarios.some(
                auxUsuario => auxUsuario.idPac == idPaciente
              );

              if (!some) {
                auxUsuarios.push({idPac: idPaciente, paciente: paciente});
              }
            });

            this.usuarios = auxUsuarios.map(
              auxUsuario => auxUsuario.paciente
            );
      })
    })
  }

  verHistoriaClinicaHandler(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.verHistoriaClinica = true;
  }
  ocultarHandler() {
    this.verHistoriaClinica = false;
  }
}
