import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  constructor(private storage: AngularFireStorage) { }

  subir(filePath:string, file:File) {
    return this.storage.upload(filePath, file);
  }

  bajar(filePath:string):AngularFireStorageReference {
    return this.storage.ref(filePath);
  }

  borrar(filePath:string) {
    return this.storage.ref(filePath).delete();
  }
}
