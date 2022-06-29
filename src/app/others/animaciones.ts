import {
    trigger,
    state,
    style,
    transition,
    animate
  } from '@angular/animations';

export const animaciones = [
    trigger('animado', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-40vh)'
        }),
        animate(700)
      ])
    ])
];
