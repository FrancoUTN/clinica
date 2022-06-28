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
  renderizar: boolean = false;
  turnos: Turno[] = [];
  fechasFirestore: string[] = [];
  fechasActuales: string[] = [];
  cantidades: number[] = [];
  diasPorDelante!: number;
  
  highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    accessibility: {
      enabled: false
    },
     title: {
        text: "Cantidad de turnos por día"
     },
     xAxis:{
        categories: this.fechasActuales
     },
     yAxis: {
        title: {
           text:"Cantidad"
        }
     },
     series: [
        {
           name: 'Turnos',
           type: 'column',
           data: this.cantidades
        }
     ]
  };

  constructor(private turnoService: TurnoService) { }

  ngOnInit(): void {
    this.diasPorDelante = 15; // Configurable

    this.turnoService.getRef().get().then(
      qs => {
        qs.forEach(
          qds => {
            const turno: any = qds.data();

            this.turnos.push(turno);
          }
        );

        this.turnos.forEach(
          turno => {
            const diaFirestore: number = turno.fecha.toDate().getDate();
            const mesFirestore: number = turno.fecha.toDate().getMonth() + 1;
            const fechaFirestore: string = diaFirestore + '/' + mesFirestore;

            this.fechasFirestore.push(fechaFirestore);
          }
        );

        for(let i = 0; i < this.diasPorDelante; i++) {
          const fechaActual = new Date();
          fechaActual.setDate(fechaActual.getDate() + i);
          
          const diaActual: number = fechaActual.getDate();
          const mesActual: number = fechaActual.getMonth() + 1;
          const strFechaActual: string = diaActual + '/' + mesActual;

          this.fechasActuales.push(strFechaActual);
        }

        this.fechasActuales.forEach(
          (fechaActual, indice) => {
            let cantidad: number = 0;

            this.fechasFirestore.forEach(
              fechaFS => {
                if (fechaActual === fechaFS) {
                  cantidad++;
                }
              }
            );

            this.cantidades[indice] = cantidad;
            indice++;
          }
        )
        
        // for(let i = 0; i < this.diasPorDelante; i++) {
        //   console.log(this.fechasActuales[i] + ': ' + this.cantidades[i]);
        // }

        this.renderizar = true;
      }
    );
  }

}
