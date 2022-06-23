import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { PacienteComponent } from './paciente.component';
import { MenuPacienteComponent } from './menu-paciente/menu-paciente.component';
import { MisTurnosComponent } from '../shared/mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from '../shared/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from '../shared/solicitar-turno/solicitar-turno.component';
import { HomeComponent } from '../shared/home/home.component';


const routes: Routes = [
  { path: '', component: PacienteComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'mi-perfil', component: MiPerfilComponent },
    { path: 'mis-turnos', component: MisTurnosComponent },
    { path: 'solicitar-turno', component: SolicitarTurnoComponent }
  ]}
];

@NgModule({
  declarations: [
    PacienteComponent,
    MenuPacienteComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PacienteModule { }
