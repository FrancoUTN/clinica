import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdministradorComponent } from './administrador.component';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';
import { SharedModule } from '../shared/shared.module';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';


const routes: Routes = [
  { path: '', component: AdministradorComponent, children: [
    { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
    { path: 'usuarios', component: UsuariosComponent },
    ]
  }
];

@NgModule({
  declarations: [
    UsuariosComponent,
    AdministradorComponent,
    MenuAdministradorComponent,
    RegistroAdministradorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdministradorModule { }
