import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PacienteComponent } from './paciente.component';
import { MenuPacienteComponent } from './menu-paciente/menu-paciente.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';


const routes: Routes = [
  { path: '', component: PacienteComponent, children: [
    { path: 'mis-turnos', component: MisTurnosComponent },
    { path: 'solicitar-turno', component: SolicitarTurnoComponent }
  ]}
];

@NgModule({
  declarations: [
    PacienteComponent,
    MenuPacienteComponent,
    MisTurnosComponent,
    SolicitarTurnoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PacienteModule { }
