import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideSPA } from '../animations/slideSPA.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideSPA]
})
export class AppComponent {
  title = 'front';
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
