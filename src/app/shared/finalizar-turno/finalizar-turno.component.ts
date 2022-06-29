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
  rango: number = 0;
  switch: boolean = true;

  constructor() {}

  ngOnInit(): void {
  }

  confirmar(value: any) {
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

    if (value.clave4 && value.valor4) {
      fijos[value.clave4] = value.valor4      
    }
    if (value.clave5 && value.valor5) {
      fijos[value.clave5] = value.valor5      
    }
    if (value.clave6) {
      if (value.valor6) {
        fijos[value.clave6] = 'Sí.';
      }
      else {
        fijos[value.clave6] = 'No.';
      }
    }

    this.finalizar.emit({review: this.review, historiaClinica: fijos})
  }

}
