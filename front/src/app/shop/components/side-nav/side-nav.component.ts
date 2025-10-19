import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('openClose', [
      state('closed', style({ transform: 'translateX(-120%)' })),
      state('open', style({ transform: 'translateX(0)' })),
      transition('closed <=> open', [animate('500ms ease-in-out')])
    ])
  ]
})
export class SideNavComponent {
  protected menuState: 'open' | 'closed' = 'closed';

  toggleMenu() {
    this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
  }
}
