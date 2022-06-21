import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cancelar-turno',
  templateUrl: './cancelar-turno.component.html',
  styleUrls: ['./cancelar-turno.component.scss']
})
export class CancelarTurnoComponent implements OnInit {
  @Input() turno: any;
  @Input() rol: any;
  @Output() volver = new EventEmitter();
  @Output() cancelar = new EventEmitter<any>();

  razon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
