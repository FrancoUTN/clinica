import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { FotosService } from './fotos.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  coleccion:AngularFirestoreCollection<any>;
  documento:AngularFirestoreDocument<any> | undefined;

  email:string = '';
  uid:string = '';
  utsArray:any;
  // urlArray: string[] | any;
  
  constructor(
    firestore: AngularFirestore,
    private authService:AuthService,
    private fotosService: FotosService) {
      this.coleccion = firestore.collection('usuarios');
  }

  registrarEspecialista(datos:any) {
    this.authService.SignUp(datos.email, datos.clave)
      .then(uc => {
        if (uc.user) {
          this.uid = uc.user.uid;

          return this.fotosService.subir(this.uid, datos.foto);
        }
        throw "Sin uid";
      })
      .then(
        uts => uts.ref.getDownloadURL()
      )
      .then(
        url => {
          const documento = {
            rol: 'especialista',
            email: datos.email,
            nombre: datos.nombre,
            apellido: datos.apellido,
            edad: datos.edad,
            dni: datos.dni,
            especialidades: datos.especialidades,
            foto: url
          }
          this.coleccion.doc(this.uid).set(documento);
        }
      )
      .catch(
        err => console.log(err.message)
      );
  }

  // registrarPaciente(datos:any) {
  //   const urlArray: string[] = [];

  //   this.fotosService.subir('1' + 'adsdgfdsagf', datos.fotos[0])
  //     .then(
  //       uts => uts.ref.getDownloadURL()
  //     )
  //     .then(
  //       url => urlArray.push(url)
  //     )
  //     .then(
  //       () => console.log(urlArray)
  //     )
  //     .catch(
  //       err => console.log(err.message)
  //     );

  //   console.log(urlArray)
  // }

  registrarPaciente(datos:any) {
    const utsArray: any[] = [];
    const urlArray: string[] = [];

    this.authService.SignUp(datos.email, datos.clave)
      .then(uc => {
        if (uc.user) {
          this.uid = uc.user.uid;

          return this.fotosService.subir(this.uid + '1', datos.fotos[0]);
        }
        throw "Sin uid";
      })
      .then(
        uts => utsArray.push(uts)
      )
      .then(
        () => this.fotosService.subir(this.uid + '2', datos.fotos[1])
      )
      .then(
        uts => utsArray.push(uts)
      )
      .then(
        () => utsArray[0].ref.getDownloadURL()
      )
      .then(
        url => urlArray.push(url)
      )
      .then(
        () => utsArray[1].ref.getDownloadURL()
      )
      .then(
        url => urlArray.push(url)
      )
      .then(
        () => {
          const documento = {
            rol: 'paciente',
            email: datos.email,
            nombre: datos.nombre,
            apellido: datos.apellido,
            edad: datos.edad,
            dni: datos.dni,
            obraSocial: datos.obraSocial,
            fotos: urlArray
          }
          this.coleccion.doc(this.uid).set(documento);
        }
      )
      .catch(
        err => console.log(err.message)
      );
  }
}
