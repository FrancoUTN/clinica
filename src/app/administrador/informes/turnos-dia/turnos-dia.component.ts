import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Turno } from 'src/app/models/Turno';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos-dia',
  templateUrl: './turnos-dia.component.html',
  styleUrls: ['./turnos-dia.component.scss']
})
export class TurnosDiaComponent implements OnInit {
  strFechas: string[] = [];
  strFechaOptions: any = {
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric"
  };
  renderizar: boolean = false;

  turnos: Turno[] = [];
  
  constructor(private turnoService: TurnoService) { }

  ngOnInit(): void {
    this.turnoService.getRef().get().then(
      qs => {
        qs.forEach(
          qds => {
            const turno: any = qds.data();

            this.turnos.push(turno);
          }
        );

        // console.log(this.turnos);

        this.turnos.forEach(
          turno => {
            // const fecha = new Date(turno.fecha);

            console.log(turno.fecha.toDate());
            console.log(new Date());
          }
        )
      }
    )
  }

  // ngOnInit(): void {
  //   for(let i = 0; i < 5; i++) {
  //     const fecha = new Date();
  //     fecha.setDate(fecha.getDate() - i);
  //     this.strFechas.push(fecha.toLocaleString('es-ES', this.strFechaOptions))
  //   }
    
  //   this.renderizar = true;
  // }

  // turnos = [
  //   4,
  //   7,
  //   5,
  //   5,
  //   0
  // ]

  highcharts: typeof Highcharts = Highcharts;
  
  chartOptions: Highcharts.Options = {
    accessibility: {
      enabled: false
    },
     title: {
        text: "Cantidad de turnos por día"
     },
     xAxis:{
        categories: this.strFechas
     },
     yAxis: {
        title: {
           text:"Cantidad"
        }
     },
     series: [
        {
           name: 'Fechas',
           type: 'column',
          //  data: this.turnos
        }
     ]
  };
}
