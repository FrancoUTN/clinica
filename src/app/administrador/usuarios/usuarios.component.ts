import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RegistroService } from 'src/app/services/registro.service';
import { DocUsuario } from 'src/app/models/DocUsuario';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios:Array<Usuario> = [];
  docsUsuario!: Array<DocUsuario>;
  errorMsg:string = '';
  quieroAgregarUsuario:boolean = false;
  rolSeleccionado:string = 'paciente';
  verHistoriaClinica: boolean = false;
  pacienteSeleccionado: any;
  
  constructor(
    private registroService: RegistroService,
    private usuarioService:UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      dcas => {
        this.docsUsuario = [];
        this.usuarios = [];

        dcas.forEach(
          dca => {
            const data: any = dca.payload.doc.data();
            
            const docUsuario: DocUsuario = {
              id: dca.payload.doc.id,
              usuario: data
            }

            this.docsUsuario.push(docUsuario);
            this.usuarios.push(data);
          }
        );
      } 
    )
  }

  // ngOnInit(): void {
  //   this.usuarioService.getUsuarios().subscribe(
  //     dcas => {
  //       this.usuarios = [];

  //       dcas.forEach(
  //         dca => {
  //           const obj:any = dca.payload.doc.data();
  //           obj.id = dca.payload.doc.id;
  //           this.usuarios.push(obj);
  //         }
  //       );
  //     } 
  //   )
  // }

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
