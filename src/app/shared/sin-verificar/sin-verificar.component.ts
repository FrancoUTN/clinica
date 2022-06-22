import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sin-verificar',
  template: `
    <div
      id="bienvenida-contenedor" 
      class="d-flex justify-content-center align-items-center"
    >
      <div
          class="d-flex flex-column align-items-center text-white p-5 fondo-oscuro"
      >    
          <h1>¡Lo sentimos!</h1>
          <p class="mt-5">
              Debes verificar tu cuenta de mail antes de entrar.
          </p>
          <p>
              Para más información, consulte a la Administración.
          </p>
          <button class="btn btn-secondary mt-5" (click)="onVolverClickHandler()" style="width: 12rem;">Volver</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class SinVerificarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onVolverClickHandler() {
    this.router.navigateByUrl("");
  }

}
