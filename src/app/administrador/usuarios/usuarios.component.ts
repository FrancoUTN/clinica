import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios:Array<any> = [];
  esPaciente:boolean = true;
  errorMsg:string = '';
  quieroAgregarUsuario:boolean = false;
  
  constructor(
    private registroService: RegistroService,
    private usuarioService:UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      dca => {
        this.usuarios = [];

        dca.forEach(
          a => this.usuarios.push(a.payload.doc.data())
        );
      } 
    )
  }

  clickPacienteHandler() {
    this.esPaciente = true;
  }
  clickEspecialistaHandler() {
    this.esPaciente = false;
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

}
