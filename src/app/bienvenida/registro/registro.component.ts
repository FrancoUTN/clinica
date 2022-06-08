import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  esPaciente:boolean = false;
  error:string = '';

  constructor(
    private router: Router,
    private authService:AuthService) {
  }

  ngOnInit(): void {
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
