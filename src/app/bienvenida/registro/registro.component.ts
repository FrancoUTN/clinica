import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  juegos = [
    'Ahorcado',
    'Mayor o Menor',
    'Preguntados',
    'Alcoholímetro'
  ];
  encuestaForm: FormGroup | any;
  esPaciente:boolean = false;
  error:string = '';

  constructor(
    private router: Router,
    private authService:AuthService) {
  }

  ngOnInit() {
    this.encuestaForm = new FormGroup({
      'nombre': new FormControl(null, [Validators.required, this.emptyValidator]),
      'apellido': new FormControl(null, [Validators.required, this.emptyValidator]),
      'edad': new FormControl(null, [Validators.required, Validators.min(18), Validators.max(99)]),
      'dni': new FormControl(null, [Validators.required, Validators.max(99999999)]),

      'juego': new FormControl(null, [Validators.required]),
      'meGusta': new FormControl(false), // Igual guarda null
      'comentario': new FormControl(null, [Validators.required, this.emptyValidator])
    });
  }

  get nombre() { return this.encuestaForm.get('nombre'); }
  get apellido() { return this.encuestaForm.get('apellido'); }
  get edad() { return this.encuestaForm.get('edad'); }
  get dni() { return this.encuestaForm.get('dni'); }

  get juego() { return this.encuestaForm.get('juego'); }
  get meGusta() { return this.encuestaForm.get('meGusta'); }
  get comentario() { return this.encuestaForm.get('comentario'); }
  
  emptyValidator(control: AbstractControl): object | null {
    const valor = control.value;

    if (valor) {
      if (valor.trim().length === 0) {
        return { emptyField: true};
      };
    };

    return null;
  }

  onSubmit() {
    console.log("Submit");
    // this.signUp();
  }
  
  signUp(value:any) {
    this.authService.SignUp(value.email, value.password)
      .then(() => this.router.navigateByUrl('page/home')) // Definir
      .catch(razon => this.error = razon.message);
  }

  clickPacienteHandler() {
    this.esPaciente = true;
  }

  clickEspecialistaHandler() {
    this.esPaciente = false;
  }
}
