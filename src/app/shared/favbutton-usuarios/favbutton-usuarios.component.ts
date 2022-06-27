import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocUsuario } from 'src/app/models/DocUsuario';

@Component({
  selector: 'app-favbutton-usuarios',
  templateUrl: './favbutton-usuarios.component.html',
  styleUrls: ['./favbutton-usuarios.component.scss']
})
export class FavbuttonUsuariosComponent implements OnInit {
  @Input() docsUsuario!: DocUsuario[];
  @Output() usuarioSeleccionado = new EventEmitter<DocUsuario>();

  constructor() { }

  ngOnInit(): void {
  }

}
