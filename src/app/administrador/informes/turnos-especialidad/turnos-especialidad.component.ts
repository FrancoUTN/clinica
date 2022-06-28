import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import * as Highcharts from 'highcharts';
import { Turno } from 'src/app/models/Turno';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/Especialidad';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-turnos-especialidad',
  templateUrl: './turnos-especialidad.component.html',
  styleUrls: ['./turnos-especialidad.component.scss']
})
export class TurnosEspecialidadComponent implements OnInit {
  especialidades: Especialidad[] = [];
  strEspecialidades: string[] = [];
  cantidades: number[] = [];

  renderizar: boolean = false;
  turnos: Turno[] = [];
  
  highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    accessibility: {
      enabled: false
    },
     title: {
        text: "Cantidad de turnos por especialidad"
     },
     xAxis:{
        categories: this.strEspecialidades
     },
     yAxis: {
        title: {
           text:"Cantidad"
        }
     },
     series: [
        {
           name: 'Turnos',
           type: 'bar',
           data: this.cantidades
        }
     ]
  };

  constructor(
    private turnoService: TurnoService,
    private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.especialidadService.getEspecialidades().pipe(
      switchMap(
        qs => {
          qs.forEach(
            qds => {
              const nombre = qds.data().nombre;
              const imagen = qds.data().imagen;
  
              this.especialidades.push({nombre: nombre, imagen: imagen});
            }
          );  

          return this.turnoService.getRef().get()
        }
      ),
      map(
        qs => qs.forEach(
          qds => {
            const data: any = qds.data();
            this.turnos.push(data);
          }
        )
      )
    ).subscribe(
      () => {
        this.especialidades.forEach(
          especialidad => {
            this.strEspecialidades.push(especialidad.nombre);
            let cantidad = 0;

            this.turnos.forEach(
              turno => {
                if (turno.especialidad === especialidad.nombre) {
                  cantidad++;
                }
              }
            );

            this.cantidades.push(cantidad);
          }
        );

        this.renderizar = true;
      }
    );
  }

}
