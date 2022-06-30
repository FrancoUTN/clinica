import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEjercicioA]'
})
export class EjercicioADirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = this.getSeason();
  }

  getSeason() {
    const mes = new Date().getMonth().toString();
    
    switch(mes) {
      case '12':
      case '1':
      case '2':
        return 'orange';
      case '3':
      case '4':
      case '5':
        return 'gray';
      case '6':
      case '7':
      case '8':
        return 'lightblue';
      case '9':
      case '10':
      case '11':
        return 'green';
      default:
        return '';
    }
}

}
