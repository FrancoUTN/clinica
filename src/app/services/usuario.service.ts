import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { FotosService } from './fotos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private angularFirestore: AngularFirestore,
    private fotosService: FotosService
  ) { }

  getUsuarios() {
    return this.angularFirestore
      .collection("usuarios")
  }

  getUsuariosRef() {
    return this.angularFirestore
      .collection("usuarios")
      .ref
  }

  getUsuario(id: string) {
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

  updatePaciente(id: string, historiaClinica: any) {
    return this.angularFirestore
      .collection("usuarios")
      .doc(id)
      .update({
        historiaClinica: historiaClinica
      });
  }
  
  // Deletes all user-related data
  // Doesn't delete it from Firebase Authentication
  deleteUserData(id: string, role: string) {
    const doc = this.getDoc(id);    
    if (role === 'paciente') {
      doc.delete().then(
        () => {
          this.fotosService.borrar(id + '1')
          this.fotosService.borrar(id + '2')
        }
      )
    }
    else {
      doc.delete().then(
        () => {
          this.fotosService.borrar(id)
        }
      )
    }
  }

  getDoc(id: string) {
    return this.angularFirestore
      .collection("usuarios")
      .doc(id);
  }
}
