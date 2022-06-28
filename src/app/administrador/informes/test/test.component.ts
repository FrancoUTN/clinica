import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  strFechas: string[] = [];
  strFechaOptions: any = {
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric"
  };
  renderizar: boolean = false;
  
  constructor(private turnoService: TurnoService) { }

  ngOnInit(): void {
    for(let i = 0; i < 5; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      this.strFechas.push(fecha.toLocaleString('es-ES', this.strFechaOptions))
    }
    
    this.renderizar = true;
  }

  turnos = [
    4,
    7,
    5,
    5,
    0
  ]

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
           data: this.turnos
        }
     ]
  };
}
