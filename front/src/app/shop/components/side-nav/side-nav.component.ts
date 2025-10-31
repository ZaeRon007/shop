import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostListener, signal, Signal } from '@angular/core';
import { slideAnimation } from '../../../../animations/slide.animation';
import { BehaviorSubject } from 'rxjs';

const width = 1190;
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
  screenSize$ = new BehaviorSubject<boolean>(window.innerWidth >= width);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const isLarge = event.target.innerWidth >= width;
    this.screenSize$.next(isLarge);
  }

}
