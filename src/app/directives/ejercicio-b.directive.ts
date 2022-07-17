import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEjercicioB]'
})
export class EjercicioBDirective {

  constructor(private el: ElementRef) { }

  @HostListener('wheel') onWheel() {
    const pixels = getComputedStyle(this.el.nativeElement).fontSize;
    let size = parseInt(pixels);

    if (size < 50) {
      size += 3;
    }

    this.el.nativeElement.style.fontSize = size + 'px';
  }
}
