import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocUsuario } from 'src/app/models/DocUsuario';
import { Usuario } from 'src/app/models/Usuario';
import { Turno } from 'src/app/models/Turno';
import { map } from 'rxjs';
import { logoEnBase64 } from 'src/app/others/logo-en-base-64';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mis-atenciones',
  templateUrl: './mis-atenciones.component.html',
  styleUrls: ['./mis-atenciones.component.scss']
})
export class MisAtencionesComponent implements OnInit {
  @Output() volver = new EventEmitter();
  miUid!: string;  
  docsEspecialista: DocUsuario[] = [];
  especialistaSeleccionado!: Usuario;
  turnos: Turno[] = [];
  verTurnos: boolean = false;

  constructor(
    private turnoService: TurnoService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserID().pipe(
      map(
        (userID: string) => {
          this.miUid = userID;

          return this.turnoService.getRef()
            .where('idPac', '==', this.miUid)
            .where('estado', '==', 'realizado')
            .get()
        }
      )
    )
    .subscribe(
      promesa => {
        promesa.then(
          qs => qs.forEach(doc => {
            const objeto: any = doc.data();
            const idEspecialista = objeto.idEsp;
            const especialista = objeto.especialista;
  
            const some = this.docsEspecialista.some(
              esp => idEspecialista === esp.id
            );
  
            if (!some) {
              this.docsEspecialista.push({id: idEspecialista, usuario: especialista});
            }
          })
        );
      }
    );
  }

  usuarioSeleccionadoHandler(docUsuario: DocUsuario) {
    this.especialistaSeleccionado = docUsuario.usuario;

    this.turnoService.getRef()
      .where('idPac', '==', this.miUid)
      .where('estado', '==', 'realizado')
      .where('idEsp', '==', docUsuario.id)
      .get()
      .then(
        qs => {
          this.turnos =[];

          qs.forEach(
            qds => {
              const turno: any = qds.data()
              this.turnos.push(turno);
            }
          );

          // this.verTurnos = true;
          this.crearPDF();
        }
      );
  }
  
  crearPDF() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    const arrayDeArrays:Array<Array<string>> = [];
    const doctor = this.especialistaSeleccionado.apellido + ', ' + this.especialistaSeleccionado.nombre;
    
    this.turnos.forEach(
      turno => {
          const horario = turno.fecha.toDate().toLocaleString('es-ES', options);

          const datosUtiles: string[] = [
            horario,
            turno.especialidad,
            turno.reviewEsp
          ];

          arrayDeArrays.push(datosUtiles);
      }
    );

    const dd: any = {
      content: [
        {
          text: 'Historial de atenciones con el Dr. ' + doctor + ':',
          style: 'header'
        },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Horario', 'Especialidad', 'Reseña del especialista'],
              ...arrayDeArrays
            ]
          }
        },
        {
          image: logoEnBase64,
          width: 200,
          style: 'logo',
          alignment: 'center',
          opacity: 0.5
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        logo: {
			    alignment: 'justify',
        }
      }
    };
    
    const pdf = pdfMake.createPdf(dd);
    pdf.open();
  }
}
