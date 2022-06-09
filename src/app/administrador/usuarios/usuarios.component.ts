import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RegistroService } from 'src/app/services/registro.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios:Array<any> = [];
  esPaciente:boolean = true;
  errorMsg:string = '';
  
  constructor(
    private router: Router,
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

  especialistaEnviadoHandler(objeto:any) {
    // console.log(objeto);
    this.registroService.registrarEspecialista(objeto).then(
      () => this.router.navigateByUrl('verificar')
    )
    .catch(
      err => this.errorMsg = err.message
    );
  }
}
