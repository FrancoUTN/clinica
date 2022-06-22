import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-especialista',
  templateUrl: './menu-especialista.component.html',
  styleUrls: ['./menu-especialista.component.scss']
})
export class MenuEspecialistaComponent implements OnInit {

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
    this.authService.SignOut();
    
    this.router.navigateByUrl('');
  }
}
