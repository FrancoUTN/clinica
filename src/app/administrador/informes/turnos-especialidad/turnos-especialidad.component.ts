import { Component, OnInit } from '@angular/core';
import { DocUsuario } from 'src/app/models/DocUsuario';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as Highcharts from 'highcharts';
import { Turno } from 'src/app/models/Turno';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/Especialidad';

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
           type: 'column',
           data: this.cantidades
        }
     ]
  };

  constructor(
    private turnoService: TurnoService,
    private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.especialidadService.getEspecialidades().subscribe(
      qs => {
        qs.forEach(
          qds => {
            const nombre = qds.data().nombre;
            const imagen = qds.data().imagen;

            this.especialidades.push({nombre: nombre, imagen: imagen});
          }
        );

      }
    );

    this.turnoService.getRef().get().then(
      qs => {
        qs.forEach(
          qds => {
            const data: any = qds.data();
            this.turnos.push(data);
          }
        );
      }
    );
    // this.turnoService.getRef().get().then(
    //   qs => {
    //     qs.forEach(
    //       qds => {
    //         const data: any = qds.data();
    //         const esp: string = data.especialidad;
    //         let cantidad = 0;

    //         this.especialidades.forEach(
    //           (especialidad, indice) => {
    //             if (esp === especialidad.nombre) {
    //               cantidad++;
    //             }
    //           }
    //         );

    //         this.strEspecialidades.push()
    //         this.cantidades.push(cantidad);


    //       }
    //     )
    //   }
    // )
  }

  accionar() {
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

}
