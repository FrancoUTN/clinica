import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { IngresoService } from 'src/app/services/ingreso.service';
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
  usuarios:Array<any> = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private ingresoService: IngresoService,
    private errorsService: ErrorsService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().get().subscribe(
      qs => {
        this.usuarios = [];
        const demoUsersIds = [
          'M6yZAmWqoWYbZuq5TVZeD44QDkG3',
          'UVh5fxjSOlRZlSsVnancPON2Oat1',
          'PJ3O4mlP3Nfty6knT3nRHWELmA12'
        ];
        qs.forEach(
          qds => {
            if (demoUsersIds.includes(qds.id)) {
              const obj:any = qds.data();
              obj.id = qds.id;
              this.usuarios.push(obj)
            }
          }
        );
        this.isLoading = false;
      }
    );
  }
  
  signIn(value: any) {

    this.authService.SignIn(value.email, value.password)
      .then(
        u => {
          if (u.user) {
            this.usuarioService.getUsuario(u.user.uid).subscribe(
              ds => {
                const obj:any = ds.data();
                const rol = obj.rol;

                if (u.user?.email) {
                  this.ingresoService.add(u.user.email, new Date())
                }

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
      )
      .catch(e => this.error = this.errorsService.getFirebaseErrorMsg(e));
  }
  
  rellenar(email: string) {
    this.atrEmail = email;
    this.atrPassword = '123123';
  }
  
}
