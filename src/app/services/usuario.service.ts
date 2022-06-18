import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private angularFirestore: AngularFirestore) { }

  getUsuarios() {
    return this.angularFirestore
      .collection("usuarios")
      .snapshotChanges()
  }

  getUsuariosRef() {
    return this.angularFirestore
      .collection("usuarios")
      .ref
  }

  getUsuario(id: string) {
    // return this.angularFirestore
    //   .collection("usuarios")
    //   .doc(id).
    //   .valueChanges()

    return this.angularFirestore
      .collection("usuarios")
      .doc(id)
      .get()
  }

  createUsuario(id: string, usuario: any) {
    return this.angularFirestore.collection("usuarios")
      .doc(id)
      .set(usuario);
  }

  updateEspecialista(habilitado: boolean, id: string) {
    return this.angularFirestore
      .collection("usuarios")
      .doc(id)
      .update({
        habilitado: habilitado
      });
  }

}
