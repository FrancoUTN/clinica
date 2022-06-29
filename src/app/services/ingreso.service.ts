import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Ingreso } from '../models/Ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  coleccion: AngularFirestoreCollection<Ingreso>

  constructor(angularFirestore: AngularFirestore) {
    this.coleccion = angularFirestore.collection('ingresos');
  }

  getRef() {
    return this.coleccion.ref
  }

  add(uid: string, fecha: Date) {
    return this.coleccion
      .add({
        uid: uid,
        fecha: fecha,
      });
  }
}
