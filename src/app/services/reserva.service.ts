import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor( private angularFirestore: AngularFirestore) { }

  getRef() {
    return this.angularFirestore
      .collection("reservas")
      .ref
  }

}
