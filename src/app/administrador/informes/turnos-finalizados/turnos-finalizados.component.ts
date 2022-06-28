import { Component, OnInit } from '@angular/core';
import { DocUsuario } from 'src/app/models/DocUsuario';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as Highcharts from 'highcharts';
import { Turno } from 'src/app/models/Turno';

@Component({
  selector: 'app-turnos-finalizados',
  templateUrl: './turnos-finalizados.component.html',
  styleUrls: ['./turnos-finalizados.component.scss']
})
export class TurnosFinalizadosComponent implements OnInit {
  start = new Date();
  end = new Date();

  especialistas: DocUsuario[] = [];

  strEspecialistas: string[] = [];
  cantidades: number[] = [];

  renderizar: boolean = false;  
  turnos: Turno[] = [];
  
  highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    accessibility: {
      enabled: false
    },
     title: {
        text: "Turnos finalizados por médico en un lapso de tiempo"
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
        }
      );
  }

  confirmar(valor: any) {
    this.start = new Date(valor.inicio);
    this.end = new Date(valor.fin);

    this.turnoService.getRef()
      .where('estado', '==', 'realizado')
      .where('fecha', '>', this.start)
      .where('fecha', '<', this.end)
      .get()
      .then(
        qs => {
          qs.forEach(
            qds => {
              const turno: any = qds.data();

              this.turnos.push(turno);
            }
          );

          this.especialistas.forEach(
            (especialista) => {
              let cantidad = 0;

              this.turnos.forEach(
                (turno) => {
                  if (especialista.id === turno.idEsp) {
                    cantidad++;
                  }
                }
              );

              this.strEspecialistas.push(especialista.usuario.apellido);
              this.cantidades.push(cantidad);
            }
          );
          
          this.renderizar = true;
        }
      );
    
  }
}
