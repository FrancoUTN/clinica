import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PacienteComponent } from './paciente.component';
import { MenuPacienteComponent } from './menu-paciente/menu-paciente.component';


const routes: Routes = [
  { path: '', component: PacienteComponent },
];

@NgModule({
  declarations: [
    PacienteComponent,
    MenuPacienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PacienteModule { }
