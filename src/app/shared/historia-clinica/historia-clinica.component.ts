import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { logoEnBase64 } from 'src/app/others/logo-en-base-64';

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

  createPDF() {
    const textos: any[] = [];

    if (this.hc) {
      const paresHC = Object.entries(this.hc);

      paresHC.forEach(
        parHC => textos.push({text: '\n' + parHC[0] + ': ' + parHC[1]})
      )
    }

    const fechaEmision = new Date().toLocaleDateString();
    const fechaTexto = {
      text: fechaEmision,
      alignment: 'center',
      style: 'fecha'
    }

    const pdfDefinition: any = {
      content: [
        {
          text: 'Historia clínica',
          style: 'titulo',
          alignment: 'center'
        },
        fechaTexto,
        {
          text: 'Datos personales',
          style: 'subtitulo1'
        },
        {
          text: [
              'Paciente: ' + this.paciente.nombre + ' ' + this.paciente.apellido,
              '\n\nEdad: ' + this.paciente.edad,
              '\n\nDNI: ' + this.paciente.dni,
              '\n\nObra Social: ' + this.paciente.obraSocial,
              '\n\n'
            ]
        },
        {
          text: 'Datos médicos',
          style: 'subtitulo2'
        },
        ...textos,
        {
          image: logoEnBase64,
          width: 200,
          style: 'logo',
          alignment: 'center',
          opacity: 0.5
        }
      ],
      styles: {
        titulo: {
			    alignment: 'justify',
          fontSize: 34,
          bold: true,
        },
        fecha: {
			    alignment: 'justify',
          fontSize: 18,
          margin: [0, 0, 0, 50]
        },
        subtitulo1: {
          fontSize: 20,
          bold: true,
          margin: [0, 20]
        },
        subtitulo2: {
          fontSize: 20,
          bold: true,
          margin: [0, 20, 10, 0]
        },
        logo: {
			    alignment: 'justify',
        }
      }
    }
 
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open(); 
  }

}
