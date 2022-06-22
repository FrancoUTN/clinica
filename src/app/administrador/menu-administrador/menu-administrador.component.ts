import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-administrador',
  templateUrl: './menu-administrador.component.html',
  styleUrls: ['./menu-administrador.component.scss']
})
export class MenuAdministradorComponent implements OnInit {

  email:string = '';

  constructor(
    private router: Router,
    private authService:AuthService) {
      this.authService.getAuthState().subscribe(
        (usuario) => {
          if (usuario && usuario.email) {
              this.email = usuario.email;
          }
        }
      );
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.SignOut()
      .then(() => this.router.navigateByUrl(''));
  }
}
