import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit {
  especialidades = [
    'Nutrición',
    'Dermatología',
    'Traumatología',
    'Cardiología',
  ];
  signupForm: FormGroup | any;
  error:string = '';
  foto:File|any;

  get nombre() { return this.signupForm.get('nombre'); }
  get apellido() { return this.signupForm.get('apellido'); }
  get edad() { return this.signupForm.get('edad'); }
  get dni() { return this.signupForm.get('dni'); }
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
      'edad': new FormControl(null, [Validators.required, Validators.min(18), Validators.max(99)]),
      'dni': new FormControl(null, [Validators.required, Validators.max(99999999)]),
      'especialidades': new FormArray([]),
      'email': new FormControl(null, [Validators.required, this.emptyValidator]),
      'clave': new FormControl(null, [Validators.required, this.emptyValidator])
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
  
  uploadFile(event:any) {
    if (event.target.files.length === 1) {
      this.foto = event.target.files[0];
    }
    else {
      this.foto = null;
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
    const obj = this.signupForm.value;
    obj.foto = this.foto;
    this.registroService.registrarEspecialista(obj).then(
      () => this.router.navigateByUrl('verificar')
    )
    .catch(
      err => this.error = err.message
    );
  }
}
