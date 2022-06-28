import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HighchartsChartModule } from 'highcharts-angular';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdministradorComponent } from './administrador.component';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { MiPerfilComponent } from '../shared/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from '../shared/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from '../shared/solicitar-turno/solicitar-turno.component';
import { InformesComponent } from './informes/informes.component';
import { TurnosDiaComponent } from './informes/turnos-dia/turnos-dia.component';
import { TestComponent } from './informes/test/test.component';


const routes: Routes = [
  { path: '', component: AdministradorComponent, children: [
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'mi-perfil', component: MiPerfilComponent },
    { path: 'turnos', component: MisTurnosComponent },
    { path: 'solicitar-turno', component: SolicitarTurnoComponent },
    {
      path: 'informes',
      loadChildren: () => import('./informes/informes.module').then(m => m.InformesModule)
    }
  ]}
];

@NgModule({
  declarations: [
    UsuariosComponent,
    AdministradorComponent,
    MenuAdministradorComponent,
    RegistroAdministradorComponent,
    InformesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdministradorModule { }
