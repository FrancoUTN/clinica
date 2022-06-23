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
  hcPrevia: any;

  constructor() {}

  ngOnInit(): void {
    this.hcPrevia = this.turno.paciente.historiaClinica ? this.turno.paciente.historiaClinica : null;
  }

  signIn(value: any) {
    this.finalizar.emit({review: this.review, historiaClinica: value})
  }

}
