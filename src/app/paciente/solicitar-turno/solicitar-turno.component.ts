import { Component, OnInit } from '@angular/core';
import { on } from 'events';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  especialidades: string[] = ["Nutrición", "Dermatología", "Traumatología"];
  especialistas: any[] = [];
  paso1: boolean = true;
  paso2: boolean = false;
  paso3: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  onEspecialidadSeleccionadaHandler() {
    this.usuarioService.getUsuariosRef().where('rol', '==', 'especialista').get()
      .then(
        qs => {
          qs.forEach(
            doc => this.especialistas.push(doc.data())
          )
          this.paso1 = false;
          this.paso2 = true;
        }
      )
  }

  onEspecialistaSeleccionadoHandler() {
    this.paso2 = false;
    this.paso3 = true;
  }
}
