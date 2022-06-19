import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor( private angularFirestore: AngularFirestore) { }

  getAgendas() {
    return this.angularFirestore
      .collection("agendas")
      .snapshotChanges()
  }

  getAgendasRef() {
    return this.angularFirestore
      .collection("agendas")
      .ref
  }

  getAgenda(id: string) {
    return this.angularFirestore
      .collection("agendas/" + id + "/fechas")
      .get();
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
