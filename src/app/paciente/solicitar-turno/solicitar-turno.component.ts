import { Component, OnInit } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
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

  paso1: boolean = true;
  paso2: boolean = false;
  paso3: boolean = false;

  horarios: Date[] = [];

  mediaHora: number = 1800;
  unaHora: number = 3600;
  unDia: number = 86400;
  quinceDias: number = 1296000;

  arrayDeArraysDeFechas: Array<Array<Date>> = [];
  reservasEspecialistaRef: Query<any> | undefined;
  idEsp: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private agendaService: AgendaService,
    private reservaService: ReservaService) { }

  ngOnInit(): void {
  }

  agregarFecha() {    
    const fecha = new Date();
    fecha.setDate(20);
    fecha.setHours(12, 0, 0, 0);

    this.reservaService.add(this.idEsp, fecha)
      .then(
        docRef => console.log("Fecha agregada: " + fecha)
      );
  }

  rellenarHorarios() {
    // const fecha = new Date();
    // // fecha.setDate(fecha.getDate() + i);
    // fecha.setHours(9, 30, 0, 0);
    // const marcaDeTiempo = timeStamp.fromDate(fecha);

    // this.reservasEspecialistaRef?.where("fecha", "==", marcaDeTiempo).get()
    //   .then(
    //     qs => qs.forEach(
    //       doc => console.log(doc.data())
    //     )
    //   )

    const fecha = new Date();
    fecha.setDate(20);
    fecha.setHours(12, 0, 0, 0);
    // console.log("Local: " + fecha);
    // console.log("Local    : " + fecha.valueOf());

    // this.reservasEspecialistaRef?.where("fecha", "==", fecha).get()
    //     .then(
    //       qs => qs.forEach(
    //         doc => console.log("Te encontré")
    //       )
    //     )
    const reservas: number[] = [];
    
    this.reservasEspecialistaRef?.get().then(
      qs => qs.forEach(
        // doc => console.log("Firestore: " + doc.get("fecha").toDate().valueOf())
        doc => reservas.push(doc.get("fecha").toDate().valueOf())
      )
    )
    .then(()=>{
      // const ref = this.reservaService.getRef()

      console.log(reservas);
      for(let i = 0; i < 15; i++) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + i);
        this.arrayDeArraysDeFechas.push([]);

        const dia = fecha.getDay();
        const horas = dia !== 6 ? 19 : 14;

        if(dia !== 0)
          for(let j = 8; j < horas; j++) {
            const nuevaFecha = new Date(fecha);
            nuevaFecha.setHours(j, 0, 0, 0);

            if (reservas.indexOf(nuevaFecha.valueOf()) < 0)
              this.arrayDeArraysDeFechas[i].push(nuevaFecha);
          }
      }
    })
  }
  // rellenarHorarios() {
  //   // var someDate = new Date();
  //   // var numberOfDaysToAdd = 15;
  //   // var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  //   // console.log(new Date(result))
    
  //   // const arrayDiaDeSemana = [];
  //   // const arraySabado = [];
  //   // const arrayDomingo = []; // Hace falta?

  //   const arrayDeArraysDeFechas: Array<Array<Date>> = [];

  //   for(let i = 0; i < 3; i++) { // i < 15
  //     const fecha = new Date();
  //     fecha.setDate(fecha.getDate() + i);
  //     // this.horarios.push(fecha);

  //     for(let j = 8; j < 12; j++) { // j < 19
  //       // const hora = new Date();
  //       // const mediaHora = new Date();

  //       // hora.setHours(i, 0);
  //       // mediaHora.setHours(i, 30);

  //       const nuevaFecha = new Date(fecha);
  //       nuevaFecha.setHours(j, 0);

  //       // this.horarios.push(hora, mediaHora);
  //       this.horarios.push(nuevaFecha);
  //     }
  //   }
  // }

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

    this.idEsp = id;
    // console.log(id);

    // this.reservaService.getRef().where("uid", "==", id).get()
    //   .then(
    //     qs => {
    //       qs.forEach(
    //         doc => console.log(doc.data())
    //       )
    //     }
    //   );

    this.reservasEspecialistaRef = this.reservaService.getRef().where("uid", "==", id);
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
