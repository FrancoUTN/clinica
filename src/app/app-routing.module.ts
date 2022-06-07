import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './bienvenida/login/login.component';
import { RegistroComponent } from './bienvenida/registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: RegistroComponent },
  { path: 'registro', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
