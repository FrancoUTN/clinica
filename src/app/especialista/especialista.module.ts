import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EspecialistaComponent } from './especialista.component';
import { MenuEspecialistaComponent } from './menu-especialista/menu-especialista.component';


const routes: Routes = [
  { path: '', component: EspecialistaComponent },
];

@NgModule({
  declarations: [
    EspecialistaComponent,
    MenuEspecialistaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EspecialistaModule { }
