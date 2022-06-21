import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EspecialistaComponent } from './especialista.component';
import { MenuEspecialistaComponent } from './menu-especialista/menu-especialista.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './mis-horarios/mis-horarios.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '', component: EspecialistaComponent, children:
    [
      {
        path: 'mi-perfil', component: MiPerfilComponent, children:
        [
          {
            path: 'mis-horarios', component: MisHorariosComponent
          }
        ]
      },
      {
        path: 'mis-turnos', component: MisTurnosComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    EspecialistaComponent,
    MenuEspecialistaComponent,
    MiPerfilComponent,
    MisHorariosComponent,
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ]
})
export class EspecialistaModule { }
