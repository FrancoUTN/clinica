import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/models/Ingreso';
import { IngresoService } from 'src/app/services/ingreso.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log-ingresos',
  templateUrl: './log-ingresos.component.html',
  styleUrls: ['./log-ingresos.component.scss']
})
export class LogIngresosComponent implements OnInit {
  ingresos: Ingreso[] = [];

  constructor(private ingresoService: IngresoService) { }

  ngOnInit(): void {
    this.ingresoService.getAll().onSnapshot(
      qs => {
        this.ingresos = [];
    
        qs.forEach(
          qds => {
            this.ingresos.push(qds.data());
            }
        );
      }
    );
  }

  exportarExcel(elementId: string, nombreArchivo: string) {
    /* pass here the table id */
    let element = document.getElementById(elementId);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */
    XLSX.writeFile(wb, nombreArchivo + '.xlsx'); 
  }
}
