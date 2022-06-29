import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OtroService } from 'src/app/services/otro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.scss']
})
export class MisHorariosComponent implements OnInit {
  @Output() volver = new EventEmitter();
  miUid: string = '';
  agenda: boolean[] = [];
  nuevaAgenda: boolean[] = [];
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
    this.otroService.getDocumentSnapshotDeUsuario().subscribe(
      ds => {
        this.miUid = ds.id;

        this.agenda = ds.data().agenda ? ds.data().agenda : this.mockAgenda;
        this.nuevaAgenda = this.agenda.slice();
      }
    );
  }

  confirmar() {
    this.usuarioService.getDoc(this.miUid).update({
      agenda: this.nuevaAgenda
    })
    .then(
      () => this.volver.emit()
    );
  }

  onDiaClickeado(indice: number) {
    this.nuevaAgenda[indice] = !this.nuevaAgenda[indice];
  }
}
