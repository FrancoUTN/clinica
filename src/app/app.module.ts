import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './bienvenida/login/login.component';
import { RegistroComponent } from './bienvenida/registro/registro.component';
import { RegistroEspecialistaComponent } from './bienvenida/registro/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './bienvenida/registro/registro-paciente/registro-paciente.component';
import { VerificarComponent } from './bienvenida/registro/verificar/verificar.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    LoginComponent,
    RegistroComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    VerificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
