import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EspecialistaComponent } from './especialista.component';
import { MenuEspecialistaComponent } from './menu-especialista/menu-especialista.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './mis-horarios/mis-horarios.component';


const routes: Routes = [
  { path: '', component: EspecialistaComponent, children: [
    { path: 'mi-perfil', component: MiPerfilComponent, children: [
      { path: 'mis-horarios', component: MisHorariosComponent }
    ]}
  ]}
];

@NgModule({
  declarations: [
    EspecialistaComponent,
    MenuEspecialistaComponent,
    MiPerfilComponent,
    MisHorariosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EspecialistaModule { }
