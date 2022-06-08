import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit {
  especialidades = [
    'General',
    'Nutrición',
    'Dermatología',
    'Traumatología'    
  ];
  signupForm: FormGroup | any;
  error:string = '';

  get nombre() { return this.signupForm.get('nombre'); }
  get apellido() { return this.signupForm.get('apellido'); }
  get edad() { return this.signupForm.get('edad'); }
  get dni() { return this.signupForm.get('dni'); }
  get email() { return this.signupForm.get('email'); }
  get clave() { return this.signupForm.get('clave'); }

  constructor(
    private router: Router,
    private authService:AuthService) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'nombre': new FormControl(null, [Validators.required, this.emptyValidator]),
      'apellido': new FormControl(null, [Validators.required, this.emptyValidator]),
      'edad': new FormControl(null, [Validators.required, Validators.min(18), Validators.max(99)]),
      'dni': new FormControl(null, [Validators.required, Validators.max(99999999)]),
      'especialidades': new FormArray([]),
      'email': new FormControl(null, [Validators.required, Validators.max(99999999)]),
      'clave': new FormControl(null, [Validators.required, Validators.max(99999999)]),
    });
  }
  onAddEspecialidad() {
    const control = new FormControl(null);
    (<FormArray>this.signupForm.get('especialidades')).push(control);
  }

  onChangeEspecialidad($event:any) {
    const chequeado = $event.target.checked;
    const especialidad = $event.target.value;

    if (chequeado) {
      const control = new FormControl(especialidad, Validators.required);
      (<FormArray>this.signupForm.get('especialidades')).push(control);
    }
    else {
      const indice = (<FormArray>this.signupForm.get('especialidades')).value.findIndex(
        (item:string) => item === especialidad
      );
      (<FormArray>this.signupForm.get('especialidades')).removeAt(indice);
    }
  }
  
  // Validators
  emptyValidator(control: AbstractControl): object | null {
    const valor = control.value;

    if (valor) {
      if (valor.trim().length === 0) {
        return { emptyField: true};
      };
    };

    return null;
  }

  // signUp(value:any) {
  //   this.authService.SignUp(value.email, value.password)
  //     .then(() => this.router.navigateByUrl('page/home'))
  //     .catch(razon => this.error = razon.message);
  // }

  onSubmit() {
    console.log(this.signupForm.value);
    // this.signUp();
  }  
}