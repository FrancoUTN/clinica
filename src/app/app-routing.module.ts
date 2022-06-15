import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './bienvenida/login/login.component';
import { RegistroComponent } from './bienvenida/registro/registro.component';
import { VerificarComponent } from './bienvenida/registro/verificar/verificar.component';

import { VerifiedGuard } from './auth/verified.guard';
import { AdministradorGuard } from './auth/administrador.guard';
import { PacienteGuard } from './auth/paciente.guard';
import { EspecialistaGuard } from './auth/especialista.guard';

const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'verificar', component: VerificarComponent },
  {
    path: 'paciente',
    canActivate: [VerifiedGuard, PacienteGuard],
    loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule)
  },
  {
    path: 'especialista',
    canActivate: [VerifiedGuard, EspecialistaGuard],
    loadChildren: () => import('./especialista/especialista.module').then(m => m.EspecialistaModule)
  },
  {
    path: 'administrador',
    canActivate: [VerifiedGuard, AdministradorGuard],
    loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
