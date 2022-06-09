import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './bienvenida/login/login.component';
import { RegistroComponent } from './bienvenida/registro/registro.component';

import { VerifiedGuard } from './auth/verified.guard';

const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'paciente',
    canActivate: [VerifiedGuard],
    loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule)
  },
  {
    path: 'especialista',
    canActivate: [VerifiedGuard],
    loadChildren: () => import('./especialista/especialista.module').then(m => m.EspecialistaModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
