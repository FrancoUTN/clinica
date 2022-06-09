import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  coleccion:AngularFirestoreCollection<any>;
  documento:AngularFirestoreDocument<any> | undefined;

  email:string = '';
  uid:string = '';
  
  constructor(
    private firestore: AngularFirestore,
    private authService:AuthService) {
      this.coleccion = firestore.collection('usuarios');

      // this.authService.getAuthState().subscribe(
      //   (usuario) => {
      //     if (usuario && usuario.email) {
      //         this.email = usuario.email;
      //         this.uid = usuario.uid;
      //     }
      //   }
      // );
  }

  registrarEspecialista(datos:any) {
    this.authService.SignUp(datos.email, datos.clave)
      .then(uc => uc.user?.uid)
      .then(
        uid => {
          const documento = {
            rol: 'especialista',
            email: datos.email,
            nombre: datos.nombre,
            apellido: datos.apellido,
            edad: datos.edad,
            dni: datos.dni,
            especialidades: datos.especialidades
          }
          this.firestore.collection('usuarios').doc(uid).set(documento);
        }
      )
      .catch(
        err => console.log(err.message)
      );
  }

  registrarPaciente(datos:any) {
    this.authService.SignUp(datos.email, datos.clave)
      .then(uc => uc.user?.uid)
      .then(
        uid => {
          const documento = {
            rol: 'paciente',
            email: datos.email,
            nombre: datos.nombre,
            apellido: datos.apellido,
            edad: datos.edad,
            dni: datos.dni,
            obraSocial: datos.obraSocial
          }
          this.firestore.collection('usuarios').doc(uid).set(documento);
        }
      )
      .catch(
        err => console.log(err.message)
      );
  }

  // agregarRespuesta(respuesta:any) {
  //   const rta = {
  //     uid: this.uid,
  //     email: this.email,
  //     nombre: respuesta.userData.nombre,
  //     apellido: respuesta.userData.apellido,
  //     edad: respuesta.userData.edad,
  //     telefono: respuesta.userData.tel,
  //     juego: respuesta.gameData.juego,
  //     seDivirtio: respuesta.gameData.meGusta,
  //     comentario: respuesta.gameData.comentario,
  //   }

  //   this.coleccion.add(rta);

  //   return rta;
  // }
}
