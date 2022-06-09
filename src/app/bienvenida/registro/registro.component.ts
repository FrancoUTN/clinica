import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  esPaciente:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  
  clickPacienteHandler() {
    this.esPaciente = true;
  }

  clickEspecialistaHandler() {
    this.esPaciente = false;
  }
}
