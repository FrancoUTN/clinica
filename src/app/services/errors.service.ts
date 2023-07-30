import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  errors = {
    authErrors: {
      authInvalidEmail: 'El correo electrónico ingresado tiene un formato inválido.',
      authWrongPassword: 'La contraseña ingresada es inválida.',
      authUserNotFound: 'No se encontró ningún usuario con ese correo electrónico.',
      authEmailAlreadyInUse: 'El correo electrónico ingresado ya está en uso.',
      authWeakPassword: 'La contraseña elegida no es segura: mínimo 6 caracteres.',
      authTooManyRequests: `El acceso a esta cuenta está temporalmente
        deshabilitado debido a demasiados intentos de ingreso fallidos.`
    }
  }

  constructor() { }  
  
  getFirebaseErrorMsg(error: any) {
    if (!error) {
      return "";
    }
    switch (error.code) {
      case 'auth/invalid-email': {
        return this.errors.authErrors.authInvalidEmail;
      }
      case 'auth/wrong-password': {
        return this.errors.authErrors.authWrongPassword;
      }
      case 'auth/user-not-found': {
        return this.errors.authErrors.authUserNotFound;
      }
      case 'auth/email-already-in-use': {
        return this.errors.authErrors.authEmailAlreadyInUse;
      }
      case 'auth/weak-password': {
        return this.errors.authErrors.authWeakPassword;
      }
      case 'auth/too-many-requests': {
        return this.errors.authErrors.authTooManyRequests;
      }
      default:
        return "Falló la autenticación. Intenta nuevamente.";
    }
  }
}
