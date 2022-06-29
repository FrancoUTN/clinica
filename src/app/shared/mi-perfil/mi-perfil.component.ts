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
  verMisHorarios: boolean = false;
  verMisAtenciones: boolean = false;

  constructor(private otroService: OtroService) { }

  ngOnInit(): void {
    this.otroService.getDataDeUsuario().subscribe(
      data => this.usuario = data
    );
  }

  verMisAtencionesHandler() {
    this.verMisAtenciones = true;
  }
  ocultarMisAtencionesHandler() {
    this.verMisAtenciones = false;
  }

  verMisHorariosHandler() {
    this.verMisHorarios = true;
  }
  ocultarMisHorariosHandler() {
    this.verMisHorarios = false;
  }

  verMiHistoriaClinicaHandler() {
    this.verHistoriaClinica = true;
  }
  ocultarMiHistoriaClinicaHandler() {
    this.verHistoriaClinica = false;
  }
}
