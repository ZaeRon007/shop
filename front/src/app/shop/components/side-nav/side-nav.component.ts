import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, signal, Signal } from '@angular/core';
import { slideAnimation } from '../../../../animations/slide.animation';

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

  logShowMenu(){
    console.log('showMenu:',this.showMenu());
  }
}
