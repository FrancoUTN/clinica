import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    private authService: AuthService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }
  
  signIn(value: any) {

    this.authService.SignIn(value.email, value.password)
      .then(
        u => {
          if (u.user) {
            if (u.user.emailVerified) {
              this.usuarioService.getUsuario(u.user.uid).subscribe(
                ds => {
                  const obj:any = ds.data();
                  const rol = obj.rol;

                  switch(rol) {
                    case 'paciente':
                      this.router.navigateByUrl('paciente');
                      break;
                    case 'especialista':
                      this.router.navigateByUrl('especialista');
                      break;
                    case 'administrador':
                      this.router.navigateByUrl('administrador');
                      break;
                  }
                }
              );
            }
          }
          throw {message: "Error en verificación."}
        }
      )
      .catch(razon => this.error = razon.message);
  }
  
  rellenarConPaciente() {
    this.atrEmail = 'maxiterrabusi@gmail.com';
    this.atrPassword = '123123';
  }

  rellenarConEspecialista() {
    this.atrEmail = 'cataniafrancodev@gmail.com';
    this.atrPassword = '123123';
  }
  
  rellenarConAdministrador() {
    this.atrEmail = 'no@disponible';
    this.atrPassword = '123123';
  }

}
