import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { RegistroService } from 'src/app/services/registro.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  esPaciente: boolean = true;
  errorMsg: string = '';
  isLoading: boolean = false;
  elegi: boolean = false;

  constructor(
    private router: Router,
    private registroService: RegistroService,
    private errorsService: ErrorsService) { }

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
    this.errorMsg = "";
    this.isLoading = true;
    this.registroService.registrarEspecialista(objeto).then(
      () => this.router.navigateByUrl('registro-exitoso')
    )
    .catch(
      err => {
        this.errorMsg = this.errorsService.getFirebaseErrorMsg(err)
      }
    )
    .finally(
      () => this.isLoading = false
    );
  }
  pacienteEnviadoHandler(objeto:any) {
    this.errorMsg = "";
    this.isLoading = true;
    this.registroService.registrarPaciente(objeto).then(
      () => this.router.navigateByUrl('verificar')
    )
    .catch(
      err => {
        this.errorMsg = this.errorsService.getFirebaseErrorMsg(err)
      }
    )
    .finally(
      () => this.isLoading = false
    );
  }
}
