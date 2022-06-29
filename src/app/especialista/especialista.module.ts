import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { EspecialistaComponent } from './especialista.component';
import { MenuEspecialistaComponent } from './menu-especialista/menu-especialista.component';
import { MisTurnosComponent } from '../shared/mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from '../shared/mi-perfil/mi-perfil.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { HomeComponent } from '../shared/home/home.component';


const routes: Routes = [
  { path: '', component: EspecialistaComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'pacientes', component: PacientesComponent },
    { path: 'mi-perfil', component: MiPerfilComponent },
    { path: 'mis-turnos', component: MisTurnosComponent }
  ]}
];

@NgModule({
  declarations: [
    EspecialistaComponent,
    MenuEspecialistaComponent,
    PacientesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class EspecialistaModule { }
