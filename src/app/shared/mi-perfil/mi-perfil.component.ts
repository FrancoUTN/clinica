import { Component, OnInit } from '@angular/core';
import { OtroService } from 'src/app/services/otro.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  usuario: any;
  verHistoriaClinica: boolean = false;

  constructor(private otroService: OtroService) { }

  ngOnInit(): void {
    this.otroService.getDataDeUsuario().subscribe(
      data => this.usuario = data
    );
  }

  verMisHorariosHandler() {
    console.log(this.usuario)
  }

  verMiHistoriaClinicaHandler() {
    this.verHistoriaClinica = true;
  }
  ocultarHandler() {
    this.verHistoriaClinica = false;
  }
}
