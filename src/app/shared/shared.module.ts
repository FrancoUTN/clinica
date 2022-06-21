import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroEspecialistaComponent } from '../bienvenida/registro/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from '../bienvenida/registro/registro-paciente/registro-paciente.component';
import { RegistroComponent } from '../bienvenida/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinVerificarComponent } from './sin-verificar/sin-verificar.component';
import { CancelarTurnoComponent } from './cancelar-turno/cancelar-turno.component';
import { FinalizarTurnoComponent } from './finalizar-turno/finalizar-turno.component';
import { ReviewComponent } from './review/review.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { CalificarAtencionComponent } from './calificar-atencion/calificar-atencion.component';
import { RechazarTurnoComponent } from './rechazar-turno/rechazar-turno.component';



@NgModule({
  declarations: [
    RegistroComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    SinVerificarComponent,
    CancelarTurnoComponent,
    FinalizarTurnoComponent,
    ReviewComponent,
    MisTurnosComponent,
    CalificarAtencionComponent,
    RechazarTurnoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    RegistroComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    SinVerificarComponent,
    CancelarTurnoComponent,
    FinalizarTurnoComponent,
    ReviewComponent,
    MisTurnosComponent
  ]
})
export class SharedModule { }
