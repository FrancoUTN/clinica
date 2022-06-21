import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { EspecialistaComponent } from './especialista.component';
import { MenuEspecialistaComponent } from './menu-especialista/menu-especialista.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './mis-horarios/mis-horarios.component';
import { MisTurnosComponent } from '../shared/mis-turnos/mis-turnos.component';


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
    MisHorariosComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class EspecialistaModule { }
