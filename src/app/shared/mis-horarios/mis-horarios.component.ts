import { Component, OnInit } from '@angular/core';
import { OtroService } from 'src/app/services/otro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.scss']
})
export class MisHorariosComponent implements OnInit {
  miUid: string = '';
  agenda: boolean[] = [];
  mockAgenda: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];

  semana: string[] = [
    'Domingos',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábados'
  ];

  constructor(
    private usuarioService: UsuarioService,
    private otroService: OtroService) { }

  ngOnInit(): void {
    this.otroService.getDataDeUsuario().subscribe(
      data => this.agenda = data.agenda ? data.agenda : this.mockAgenda      
    );
  }

}
