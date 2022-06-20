import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  strColeccion: string = 'turnos';

  constructor( private angularFirestore: AngularFirestore) { }

  getRef() {
    return this.angularFirestore
      .collection(this.strColeccion)
      .ref
  }

  add(objeto: any) {
    return this.angularFirestore
      .collection(this.strColeccion)
      .add(objeto)
  }

  actualizar(id: string, objeto: any) {
    return this.angularFirestore
      .collection(this.strColeccion)
      .doc(id)
      .update(objeto)
  }
}
