import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { loginRequest } from '../../models/dto/loginRequest.interface';
import { catchError, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { transition, trigger, useAnimation, AnimationEvent } from '@angular/animations';
import { wobbleAnimation } from '../../../../animations/wobble.animation';
import { pictureSizeService } from '../../../shop/services/pictureSizeService';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  animations: [
    trigger('wobble', [
      transition('false => true', [
        useAnimation(wobbleAnimation)
      ])
    ])
  ]
})
export class LogInComponent implements OnInit, OnDestroy {
  user: loginRequest = { email: "", password: "" };
  logInSubscription: Subscription = new Subscription();
  showError: boolean = false;
  protected wobbleField = false;
  private picture: string[] = ['assets/background/shop-1920px.jpeg'];
  private screenSizeSub = new Subscription();
  currentImagePath = '';


  constructor(private router: Router,
    private authService: AuthService,
    private renderer: Renderer2,
    private pictureService: pictureSizeService) {
      pictureService.setImagesTab(this.picture);
  }

  ngOnInit(): void {
    this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
      this.currentImagePath = this.pictureService.currentStaticImage();
    })
  }

  isFormValid(): boolean {
    return !!this.user.password.trim() && !!this.user.email.trim();
  }

  protected onWobbleStart(event: AnimationEvent) {
    if (event.fromState !== 'void') {
      this.renderer.addClass(event.element, 'invalid');
    }
  }


  onSubmit(): void {
    this.logInSubscription = this.authService.loginUser(this.user).pipe(
      catchError((error) => {
        if (error.status == 400 || error.status == 401) {
          this.showError = true;
        }
        this.wobbleField = true;
        return throwError(() => error);
      })
    ).subscribe((response: any) => {
      this.authService.setToken(response.token);
      this.router.navigateByUrl(`/shop/home`);
    });
  }

  

  ngOnDestroy(): void {
    this.logInSubscription.unsubscribe();
    this.screenSizeSub.unsubscribe();
  }

}
