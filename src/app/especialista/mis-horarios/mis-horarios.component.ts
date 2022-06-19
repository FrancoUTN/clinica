import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.scss']
})
export class MisHorariosComponent implements OnInit {
  uid: string = "";
  constructor(
    private agendaService: AgendaService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAuthState().subscribe(
      user => this.uid = user ? user.uid : ''
    )
  }

  // NO SE HACE ACÁ. SE ACTUALIZA DINÁMICAMENTE EN CADA SOLICITUD DEL PACIENTE
  // onActualizarAgendaHandler() {
  //   // const horarios = [];

  //   const fecha = new Date();
  //   const objeto = {
  //     fecha: fecha,
  //     tomado: false
  //   };
  //   const documento = this.agendaService.getAgendasRef().doc(this.uid);

  //   documento.set({uid: this.uid})
  //     .then(
  //       () => documento.collection('fechas').add(objeto)
  //     )
    
  //   // console.log(this.uid)
  // }
}
