import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string = '';
  atrEmail: string = '';
  atrPassword: string = '';

  constructor(    
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  signIn(value: any) {
    this.authService.SignIn(value.email, value.password)
      .then(() => this.router.navigateByUrl('page/home')) // Definir
      .catch(razon => this.error = razon.message);
  }

  rellenarConPaciente() {
    this.atrEmail = 'paciente@valido.com';
    this.atrPassword = '123456';
  }

  rellenarConEspecialista() {
    this.atrEmail = 'especialista@valido.com';
    this.atrPassword = '123456';
  }
  
  rellenarConAdministrador() {
    this.atrEmail = 'administrador@valido.com';
    this.atrPassword = '123456';
  }

}
