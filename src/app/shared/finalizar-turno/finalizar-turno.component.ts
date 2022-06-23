import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-finalizar-turno',
  templateUrl: './finalizar-turno.component.html',
  styleUrls: ['./finalizar-turno.component.scss']
})
export class FinalizarTurnoComponent implements OnInit {
  @Input() turno: any;
  @Output() volver = new EventEmitter();
  @Output() finalizar = new EventEmitter<any>();
  review: string = '';

  constructor() {}

  ngOnInit(): void {
  }

  signIn(value: any) {
    const fijos:any = {
      altura: value.altura,
      peso: value.peso,
      temperatura: value.temperatura,
      presion: value.presion,
    }

    if (value.clave1 && value.valor1) {
      fijos[value.clave1] = value.valor1
    }
    if (value.clave2 && value.valor2) {
      fijos[value.clave2] = value.valor2      
    }
    if (value.clave3 && value.valor3) {
      fijos[value.clave3] = value.valor3      
    }

    this.finalizar.emit({review: this.review, historiaClinica: fijos})
  }

}
