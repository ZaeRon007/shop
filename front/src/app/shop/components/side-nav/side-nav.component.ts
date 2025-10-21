import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostListener, signal, Signal } from '@angular/core';
import { slideAnimation } from '../../../../animations/slide.animation';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('openClose', [
      transition('* => *', [
        useAnimation(slideAnimation)
      ])
    ])
  ]
})
export class SideNavComponent {
  protected showMenu = signal(false);
  screenSize$ = new BehaviorSubject<boolean>(window.innerWidth >= 950);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const isLarge = event.target.innerWidth >= 950;
    this.screenSize$.next(isLarge);
  }

}
