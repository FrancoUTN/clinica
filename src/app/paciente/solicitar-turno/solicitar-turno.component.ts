import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  especialidades: string[] = ["Nutrición", "Dermatología", "Traumatología"];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  // onEspecialidadSeleccionadaHandler() {
  //   this.usuarioService.getUsuariosRef().where('rol', '==', 'especialista').get()
  //     .then(
  //       qs => {
  //         qs.forEach(
  //           doc => console.log(doc.data())
  //         )
  //       }
  //     )
  // }
  onEspecialidadSeleccionadaHandler() {
    this.usuarioService.getUsuariosRef().where('rol', '==', 'especialista').get()
      .then(
        qs => {
          qs.forEach(
            doc => console.log(doc.data())
          )
        }
      )
  }
  // onEspecialidadSeleccionadaHandler() {
  //   this.usuarioService.getUsuariosRef().where('rol', '==', 'especialista').get()
  //     .then(
  //       qs => {
  //         qs.forEach(
  //           doc => console.log(doc.data())
  //         )
  //       }
  //     )
  // }
}
