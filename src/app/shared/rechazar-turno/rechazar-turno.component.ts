import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rechazar-turno',
  templateUrl: './rechazar-turno.component.html',
  styleUrls: ['./rechazar-turno.component.scss']
})
export class RechazarTurnoComponent implements OnInit {
  @Input() turno: any;
  @Output() volver = new EventEmitter();
  @Output() rechazar = new EventEmitter<any>();

  razon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
