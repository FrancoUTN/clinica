import { Component, OnInit } from '@angular/core';
import { DocUsuario } from 'src/app/models/DocUsuario';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-turnos-finalizados',
  templateUrl: './turnos-finalizados.component.html',
  styleUrls: ['./turnos-finalizados.component.scss']
})
export class TurnosFinalizadosComponent implements OnInit {
  start = new Date('2022-06-30');
  end = new Date('2022-07-01');

  especialistas: DocUsuario[] = [];

  strEspecialistas: string[] = [];
  cantidades: number[] = [];

  renderizar: boolean = false;  
  // turnos: Turno[] = [];
  // fechasFirestore: string[] = [];
  // fechasActuales: string[] = [];
  // diasPorDelante!: number;
  
  highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    accessibility: {
      enabled: false
    },
     title: {
        text: "Cantidad de turnos finalizados por médico en un lapso de tiempo"
     },
     xAxis:{
        categories: this.strEspecialistas
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
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuariosRef()
      .where('rol', '==', 'especialista')
      .get()
      .then(
        qs => {
          qs.forEach(
            qds => {
              const id = qds.id;
              const data: any = qds.data();

              this.especialistas.push({id: id, usuario: data});
            }
          );

          this.especialistas.forEach(
            (docUsuario, indice) => {
              this.turnoService.getRef()
              .where('estado', '==', 'realizado')
              .where('idEsp', '==', docUsuario.id)
              .where('fecha', '>', this.start)
              .where('fecha', '<', this.end)
              .onSnapshot(
                qs => {
                  qs.forEach(
                    qds => {
                      console.log(qds.data());
                    }
                  )
                }
              );
            }
          );

          // this.turnoService.getRef()
          // .where('fecha', '>', t)
          // .where('fecha', '>', this.start)
          // .where('fecha', '<', this.end)
          // .onSnapshot(
          //   qs => {
          //     qs.forEach(
          //       qds => {
          //         console.log(qds.data());
          //       }
          //     )
          //   }
          // );

          
          this.renderizar = true;
        }
      );
  }

}
