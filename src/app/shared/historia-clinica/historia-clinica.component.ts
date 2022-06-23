import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {
  @Input() paciente: any;
  @Output() volver = new EventEmitter();

  hc:any;

  constructor() { }

  ngOnInit(): void {
    this.hc = this.paciente.historiaClinica ? this.paciente.historiaClinica : null;
  }

  createPDF(){
 
    const pdfDefinition: any = {
      content: [
        {
          text: 'Hola mundo',
        }
      ]
    }
 
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
 
  }
}
