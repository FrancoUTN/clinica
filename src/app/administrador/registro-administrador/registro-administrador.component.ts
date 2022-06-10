import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.scss']
})
export class RegistroAdministradorComponent implements OnInit {
  signupForm: FormGroup | any;
  foto: File[] | any;
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();
  @Input() error: string = '';

  get nombre() { return this.signupForm.get('nombre'); }
  get apellido() { return this.signupForm.get('apellido'); }
  get edad() { return this.signupForm.get('edad'); }
  get dni() { return this.signupForm.get('dni'); }
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
      'email': new FormControl(null, [Validators.required, this.emptyValidator]),
      'clave': new FormControl(null, [Validators.required, this.emptyValidator])
    });
  }

  uploadFiles(event:any) {
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
    this.formularioEnviado.emit(obj);    
  }
}
