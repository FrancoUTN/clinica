import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroEspecialistaComponent } from '../bienvenida/registro/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from '../bienvenida/registro/registro-paciente/registro-paciente.component';
import { RegistroComponent } from '../bienvenida/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinVerificarComponent } from './sin-verificar/sin-verificar.component';
import { CancelarTurnoComponent } from './cancelar-turno/cancelar-turno.component';



@NgModule({
  declarations: [
    RegistroComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    SinVerificarComponent,
    CancelarTurnoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RegistroComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    ReactiveFormsModule,
    SinVerificarComponent,
    CancelarTurnoComponent
  ]
})
export class SharedModule { }
