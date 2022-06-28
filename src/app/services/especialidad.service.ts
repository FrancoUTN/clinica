import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Especialidad } from '../models/Especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  coleccion: AngularFirestoreCollection<Especialidad>;

  constructor(angularFirestore: AngularFirestore) {
    this.coleccion = angularFirestore.collection('especialidades');
  }

  getRef() {
    return this.coleccion.ref;
  }

  getEspecialidades() {
    return this.coleccion.get();
  }
}
