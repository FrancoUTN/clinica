import { Component, OnInit } from '@angular/core';
import { on } from 'events';
import { AgendaService } from 'src/app/services/agenda.service';
import { ReservaService } from 'src/app/services/reserva.service';
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
  // paso1: boolean = true;

  paso2: boolean = false;

  // paso3: boolean = false;
  paso3: boolean = true;

  horarios: Date[] = [];

  mediaHora: number = 1800;
  unaHora: number = 3600;
  unDia: number = 86400;
  quinceDias: number = 1296000;


  constructor(
    private usuarioService: UsuarioService,
    private agendaService: AgendaService,
    private reservaService: ReservaService) { }

  ngOnInit(): void {
  }

  rellenarHorarios() {
    // var someDate = new Date();
    // var numberOfDaysToAdd = 15;
    // var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    // console.log(new Date(result))
    
    // const arrayDiaDeSemana = [];
    // const arraySabado = [];
    // const arrayDomingo = []; // Hace falta?

    for(let i = 0; i < 3; i++) { // i < 15
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + i);
      // this.horarios.push(fecha);

      for(let j = 8; j < 12; j++) { // j < 19
        // const hora = new Date();
        // const mediaHora = new Date();

        // hora.setHours(i, 0);
        // mediaHora.setHours(i, 30);

        const nuevaFecha = new Date(fecha);
        nuevaFecha.setHours(j, 0);

        // this.horarios.push(hora, mediaHora);
        this.horarios.push(nuevaFecha);
      }
    }
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
            doc => {
              const obj:any = doc.data();
              obj.id = doc.id;
              this.especialistas.push(obj);
            }
          )
          this.paso1 = false;
          this.paso2 = true;
        }
      )
  }

  onEspecialistaSeleccionadoHandler(id: string) {
    this.paso2 = false;
    this.paso3 = true;

    // console.log(id);

    // this.reservaService.getRef().where("uid", "==", id).get()
    //   .then(
    //     qs => {
    //       qs.forEach(
    //         doc => console.log(doc.data())
    //       )
    //     }
    //   );


  }

  // onEspecialistaSeleccionadoHandler(id: string) {
  //   this.paso2 = false;
  //   this.paso3 = true;

  //   // console.log(id);

  //   this.agendaService.getAgenda(id).subscribe(
  //     qs => {
  //       qs.forEach(
  //         // doc => console.log(doc.data())
  //         // doc => this.horarios.push(new Date(doc.get("fecha")))
  //         doc => this.horarios.push(new Date(doc.get("fecha").toDate()))
  //         // doc => console.log(doc.get("fecha").toDate())
  //       )
  //     }
  //   )
  // }
}
