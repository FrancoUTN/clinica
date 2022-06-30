import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEjercicioC]'
})
export class EjercicioCDirective {

  constructor(private el: ElementRef) { }
  
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const elementoNativo = this.el.nativeElement;
    const pixels = getComputedStyle(elementoNativo).fontSize;
    let size = parseInt(pixels);
    
    if (event.key === 'Backspace' && size > 20) {
      size -= 2;
    } else if (event.key !== 'Backspace' && size < 50) {
      size += 2;
    }

    elementoNativo.style.fontSize = size + 'px';
  }
}
