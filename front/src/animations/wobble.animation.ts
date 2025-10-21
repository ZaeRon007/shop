import { animate, animation, keyframes, style } from "@angular/animations";

export const wobbleAnimation = animation([
    animate('0.6s', keyframes([
        style({ transform: 'translateX(-5%)', offset: 0.1 }),
        style({ transform: 'translateX(5%)', offset: 0.3 }),
        style({ transform: 'translateX(-5%)', offset: 0.5 }),
        style({ transform: 'translateX(5%)', offset: 0.7 }),
        style({ transform: 'translateX(-5%)', offset: 0.9 }),
        style({ transform: 'translateX(0)', offset: 1 }),
      ]))
])