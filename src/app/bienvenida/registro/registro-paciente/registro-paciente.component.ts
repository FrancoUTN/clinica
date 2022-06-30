import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {
  siteKey: string = environment.siteKey;
  signupForm: FormGroup | any;
  fotos: File[] | any;
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();
  @Input() error: string = '';

  get nombre() { return this.signupForm.get('nombre'); }
  get apellido() { return this.signupForm.get('apellido'); }
  get edad() { return this.signupForm.get('edad'); }
  get dni() { return this.signupForm.get('dni'); }
  get obraSocial() { return this.signupForm.get('obraSocial'); }
  get email() { return this.signupForm.get('email'); }
  get clave() { return this.signupForm.get('clave'); }

  constructor() {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'nombre': new FormControl(null, [Validators.required, this.emptyValidator]),
      'apellido': new FormControl(null, [Validators.required, this.emptyValidator]),
      'edad': new FormControl(null, [Validators.required, Validators.max(99)]),
      'dni': new FormControl(null, [Validators.required, Validators.min(999999), Validators.max(99999999)]),
      'obraSocial': new FormControl(null, [Validators.required, this.emptyValidator]),
      'email': new FormControl(null, [Validators.required, this.emptyValidator]),
      'clave': new FormControl(null, [Validators.required, this.emptyValidator]),
      'recaptchaReactive': new FormControl(null, Validators.required)
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
    const obj = this.signupForm.value;
    obj.fotos = this.fotos;
    this.formularioEnviado.emit(obj);    
  }
}
