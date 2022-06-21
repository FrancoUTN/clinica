import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calificar-atencion',
  templateUrl: './calificar-atencion.component.html',
  styleUrls: ['./calificar-atencion.component.scss']
})
export class CalificarAtencionComponent implements OnInit {
  @Output() volver = new EventEmitter();
  @Output() calificar = new EventEmitter<any>();

  review: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
