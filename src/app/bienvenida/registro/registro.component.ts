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

  constructor(
    private router: Router,
    private registroService: RegistroService) { }

  ngOnInit(): void {
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
