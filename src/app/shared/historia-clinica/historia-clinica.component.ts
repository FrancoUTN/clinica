import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {
  @Input() paciente: any;
  @Output() volver = new EventEmitter();

  hc:any;

  constructor() { }

  ngOnInit(): void {
    this.hc = this.paciente.historiaClinica ? this.paciente.historiaClinica : null;
  }

}
