import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdministradorComponent } from './administrador.component';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';


const routes: Routes = [
  { path: '', component: AdministradorComponent, children: [
    { path: 'usuarios', component: UsuariosComponent },
    ]
  }
];

@NgModule({
  declarations: [
    UsuariosComponent,
    AdministradorComponent,
    MenuAdministradorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdministradorModule { }
