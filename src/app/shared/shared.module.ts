import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroEspecialistaComponent } from '../bienvenida/registro/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from '../bienvenida/registro/registro-paciente/registro-paciente.component';
import { RegistroComponent } from '../bienvenida/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SinVerificarComponent } from './sin-verificar/sin-verificar.component';



@NgModule({
  declarations: [
    RegistroComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    SinVerificarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    RegistroComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    ReactiveFormsModule,
    SinVerificarComponent
  ]
})
export class SharedModule { }
