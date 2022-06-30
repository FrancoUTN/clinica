import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Pipe({
  name: 'doctor'
})
export class DoctorPipe implements PipeTransform {

  transform(value: Usuario): string {
    return 'Dr/a. ' + value.apellido + ', ' + value.nombre;
  }

}
