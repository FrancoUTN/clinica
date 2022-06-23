import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  usuarios:Array<any> = [];
  verHistoriaClinica: boolean = false;
  pacienteSeleccionado: any;

  constructor(private usuarioService:UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      dcas => {
        this.usuarios = [];

        dcas.forEach(
          dca => {
            const obj:any = dca.payload.doc.data();
            obj.id = dca.payload.doc.id;
            this.usuarios.push(obj);
          }
        );
      } 
    )
  }

  verHistoriaClinicaHandler(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.verHistoriaClinica = true;
  }
  ocultarHandler() {
    this.verHistoriaClinica = false;
  }
}
