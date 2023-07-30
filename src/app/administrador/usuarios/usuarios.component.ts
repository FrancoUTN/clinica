import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RegistroService } from 'src/app/services/registro.service';
import { DocUsuario } from 'src/app/models/DocUsuario';
import * as XLSX from 'xlsx';
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/models/Turno';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  docsUsuario!: Array<DocUsuario>;
  errorMsg:string = '';
  quieroAgregarUsuario:boolean = false;
  rolSeleccionado:string = 'paciente';
  verHistoriaClinica: boolean = false;
  pacienteSeleccionado: any;
  turnos: Turno[] = [];
  verTurnos: boolean = false;
  
  constructor(
    private registroService: RegistroService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService) {
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().snapshotChanges().subscribe(
      dcas => {
        this.docsUsuario = [];

        dcas.forEach(
          dca => {
            const data: any = dca.payload.doc.data();
            
            const docUsuario: DocUsuario = {
              id: dca.payload.doc.id,
              usuario: data
            };

            this.docsUsuario.push(docUsuario);
          }
        );
      } 
    )
  }
  
  usuarioSeleccionadoHandler(docUsuario: DocUsuario) {
    this.turnoService.getRef()
      .where('idPac', '==', docUsuario.id)
      .get()
      .then(
        qs => {
          this.turnos = [];
          this.verTurnos = false;

          qs.forEach((doc:any) => {
            const id: string = doc.id;
            const data: any = doc.data();
      
            this.turnos.push({...data, id});

            if (!this.verTurnos) {
              this.verTurnos = true;
            }
          });
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

  onChangeHabilitado($event:any) {
    const chequeado = $event.target.checked;
    const especialista = $event.target.value;

    this.usuarioService.updateEspecialista(chequeado, especialista);
  }

  clickPacienteHandler() {
    this.rolSeleccionado = 'paciente';
  }
  clickEspecialistaHandler() {
    this.rolSeleccionado = 'especialista';
  }
  clickAdministradorHandler() {
    this.rolSeleccionado = 'administrador';
  }

  agregarUsuario() {
    this.quieroAgregarUsuario = true;
  }
  noAgregarUsuario() {
    this.quieroAgregarUsuario = false;    
  }

  especialistaEnviadoHandler(objeto:any) {
    this.registroService.registrarEspecialista(objeto)
    .catch(
      err => this.errorMsg = err.message
    );
  }
  pacienteEnviadoHandler(objeto:any) {
    this.registroService.registrarPaciente(objeto)
    .catch(
      err => this.errorMsg = err.message
    );
  }
  administradorEnviadoHandler(objeto:any) {
    this.registroService.registrarAdministrador(objeto)
    .catch(
      err => this.errorMsg = err.message
    );
  }

  verHistoriaClinicaHandler(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.verHistoriaClinica = true;
  }
  ocultarHandler() {
    this.verHistoriaClinica = false;
  }
}
