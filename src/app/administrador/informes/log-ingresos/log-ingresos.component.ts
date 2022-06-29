import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/models/Ingreso';
import { IngresoService } from 'src/app/services/ingreso.service';

@Component({
  selector: 'app-log-ingresos',
  templateUrl: './log-ingresos.component.html',
  styleUrls: ['./log-ingresos.component.scss']
})
export class LogIngresosComponent implements OnInit {
  ingresos: Ingreso[] = [];
  columnas: string[] = [];

  constructor(private ingresoService: IngresoService) { }

  ngOnInit(): void {
    this.ingresoService.getAll().subscribe(
      qs => {
        this.ingresos = [];
    
        qs.forEach(
          qds => {
            this.ingresos.push(qds.data());
            }
        );

        this.columnas = Object.keys(this.ingresos[0]);
      }
    );
  }

}
