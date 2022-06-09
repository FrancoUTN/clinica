import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {
  signupForm: FormGroup | any;
  error: string = '';
  fotos: File[] | any;

  get nombre() { return this.signupForm.get('nombre'); }
  get apellido() { return this.signupForm.get('apellido'); }
  get edad() { return this.signupForm.get('edad'); }
  get dni() { return this.signupForm.get('dni'); }
  get obraSocial() { return this.signupForm.get('obraSocial'); }
  get email() { return this.signupForm.get('email'); }
  get clave() { return this.signupForm.get('clave'); }

  constructor(
    private router: Router,
    private registroService: RegistroService) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'nombre': new FormControl(null, [Validators.required, this.emptyValidator]),
      'apellido': new FormControl(null, [Validators.required, this.emptyValidator]),
      'edad': new FormControl(null, [Validators.required, Validators.max(99)]),
      'dni': new FormControl(null, [Validators.required, Validators.max(99999999)]),
      'obraSocial': new FormControl(null, [Validators.required, this.emptyValidator]),
      'email': new FormControl(null, [Validators.required, this.emptyValidator]),
      'clave': new FormControl(null, [Validators.required, this.emptyValidator])
    });
  }

  uploadFiles(event:any) {
    if (event.target.files.length === 2) {
      this.fotos = event.target.files;
    }
    else {
      this.fotos = null;
    }
  }
  
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
    console.log(this.signupForm.value);
    this.registroService.registrarPaciente(this.signupForm.value)
  }  
}
