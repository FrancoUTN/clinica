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
  paso1: boolean = false;
  paso2: boolean = false;
  paso3: boolean = true;

  horarios: Date[] = [];

  mediaHora: number = 1800;
  unaHora: number = 3600;
  unDia: number = 86400;
  quinceDias: number = 1296000;


  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  rellenarHorarios() {
    var someDate = new Date();
    var numberOfDaysToAdd = 15;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    console.log(new Date(result))
  }

  addDays(date: number, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
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
