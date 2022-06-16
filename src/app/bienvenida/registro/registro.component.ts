import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  esPaciente:boolean = true;
  errorMsg:string = '';
  elegi: boolean = false;

  constructor(
    private router: Router,
    private registroService: RegistroService) { }

  ngOnInit(): void {
  }
  
  clickVolverHandler() {
    this.router.navigateByUrl('')
  }
  clickCancelarHandler() {
    this.elegi = false;
  }

  clickPacienteHandler() {
    this.esPaciente = true;
    this.elegi = true;
  }
  clickEspecialistaHandler() {
    this.esPaciente = false;
    this.elegi = true;
  }

  especialistaEnviadoHandler(objeto:any) {
    // console.log(objeto);
    this.registroService.registrarEspecialista(objeto).then(
      () => this.router.navigateByUrl('login')
    )
    .catch(
      err => this.errorMsg = err.message
    );
  }
  pacienteEnviadoHandler(objeto:any) {
    this.registroService.registrarPaciente(objeto).then(
      () => this.router.navigateByUrl('verificar')
    )
    .catch(
      err => this.errorMsg = err.message
    );
  }
}
