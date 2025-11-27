import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostListener, signal } from '@angular/core';
import { slideAnimation } from '../../../../animations/slide.animation';
import { BehaviorSubject } from 'rxjs';

const width = 1190;
const enterAnimationDuration = 500;
const leaveAnimationDuration = 250;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('openClose', [
      transition('* => *', [
        useAnimation(slideAnimation)
      ], {
        params: {
          leaveEnd: '-100%',
          enterStart: '-100%',
          hiddenScale: 1,
          enterDuration: enterAnimationDuration + 'ms',
          leaveDuration: leaveAnimationDuration + 'ms',
        }
      })
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
