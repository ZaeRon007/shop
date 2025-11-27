import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const slideSPA = trigger('routeAnimations', [

  transition('* <=> *', [

    // POSITIONNER LES DEUX VUES
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%'
      })
    ], { optional: true }),

    // POSITIONNER LA NOUVELLE VUE EN DEHORS DE L’ÉCRAN
    query(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 1 })
    ], { optional: true }),

    // ANIMATION SIMULTANÉE
    group([

      // ANIMATION DE L’ANCIENNE VUE (slide-out)
      query(':leave', [
        animate('600ms ease', style({ transform: 'translateX(100%)', opacity: 1 }))
      ], { optional: true }),

      // ANIMATION DE LA NOUVELLE VUE (slide-in)
      query(':enter', [
        animate('600ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ], { optional: true })

    ])
  ])
]);