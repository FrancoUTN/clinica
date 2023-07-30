import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './bienvenida/login/login.component';
import { RegistroComponent } from './bienvenida/registro/registro.component';
import { VerificarComponent } from './bienvenida/registro/verificar/verificar.component';
import { RegistroExitosoComponent } from './bienvenida/registro/registro-exitoso/registro-exitoso.component';

import { VerifiedGuard } from './auth/verified.guard';
import { AdministradorGuard } from './auth/administrador.guard';
import { PacienteGuard } from './auth/paciente.guard';
import { EspecialistaGuard } from './auth/especialista.guard';
import { AuthGuard } from './auth/auth.guard';
import { InhabilitadoComponent } from './especialista/inhabilitado/inhabilitado.component';
import { SinVerificarComponent } from './shared/sin-verificar/sin-verificar.component';

const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'verificar', component: VerificarComponent },
  { path: 'registro-exitoso', component: RegistroExitosoComponent },
  {
    path: 'paciente',
    canActivate: [VerifiedGuard, PacienteGuard],
    loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule)
  },
  {
    path: 'especialista',
    // canActivate: [VerifiedGuard, EspecialistaGuard],
    canActivate: [AuthGuard, EspecialistaGuard],
    loadChildren: () => import('./especialista/especialista.module').then(m => m.EspecialistaModule)
  },
  {
    path: 'administrador',
    // canActivate: [VerifiedGuard, AdministradorGuard],
    canActivate: [AuthGuard, AdministradorGuard],
    loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule)
  },
  { path: 'inhabilitado', component: InhabilitadoComponent },
  { path: 'sin-verificar', component: SinVerificarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
