import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdministradorComponent } from './administrador.component';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { MiPerfilComponent } from '../shared/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from '../shared/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from '../shared/solicitar-turno/solicitar-turno.component';


const routes: Routes = [
  { path: '', component: AdministradorComponent, children: [
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'mi-perfil', component: MiPerfilComponent },
    { path: 'turnos', component: MisTurnosComponent },
    { path: 'solicitar-turno', component: SolicitarTurnoComponent }
  ]}
];

@NgModule({
  declarations: [
    UsuariosComponent,
    AdministradorComponent,
    MenuAdministradorComponent,
    RegistroAdministradorComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdministradorModule { }
