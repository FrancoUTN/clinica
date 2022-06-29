import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocUsuario } from 'src/app/models/DocUsuario';
import { Usuario } from 'src/app/models/Usuario';
import { Turno } from 'src/app/models/Turno';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-mis-atenciones',
  templateUrl: './mis-atenciones.component.html',
  styleUrls: ['./mis-atenciones.component.scss']
})
export class MisAtencionesComponent implements OnInit {
  miUid!: string;  
  docsEspecialista: DocUsuario[] = [];
  especialistaSeleccionado!: Usuario;

  constructor(
    private turnoService: TurnoService,
    private authService: AuthService) {
  }

  ngOnInit(): void {

    this.authService.getUserID().pipe(
      map(
        (userID: string) => {
          return this.turnoService.getRef()
            .where('idPac', '==', userID)
            .where('estado', '==', 'realizado')
            .get()
        }
      )
    )
    .subscribe(
      promesa => {
        promesa.then(
          qs => qs.forEach(doc => {
            const objeto: any = doc.data();
            const idEspecialista = objeto.idEsp;
            const especialista = objeto.especialista;
  
            const some = this.docsEspecialista.some(
              esp => idEspecialista === esp.id
            );
  
            if (!some) {
              this.docsEspecialista.push({id: idEspecialista, usuario: especialista});
            }
          })
        );
      }
    );    

  }

  usuarioSeleccionadoHandler(algo:any) {

  }
}
