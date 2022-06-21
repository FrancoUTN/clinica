import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PacienteComponent } from './paciente.component';
import { MenuPacienteComponent } from './menu-paciente/menu-paciente.component';
// import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { MisTurnosComponent } from '../shared/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
// import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: '', component: PacienteComponent, children: [
    // { path: 'mis-turnos', component: MisTurnosComponent },
    { path: 'mis-turnos', component: MisTurnosComponent },
    { path: 'solicitar-turno', component: SolicitarTurnoComponent }
  ]}
];

@NgModule({
  declarations: [
    PacienteComponent,
    MenuPacienteComponent,
    // MisTurnosComponent,
    SolicitarTurnoComponent
  ],
  imports: [
    // CommonModule,
    RouterModule.forChild(routes),
    // FormsModule,
    SharedModule
  ]
})
export class PacienteModule { }
