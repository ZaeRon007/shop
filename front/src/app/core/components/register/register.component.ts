import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { authRequest } from '../../models/auth.interface';
import { useAnimation, AnimationEvent, transition, trigger } from '@angular/animations';
import { wobbleAnimation } from '../../../../animations/wobble.animation';
import { pictureSizeService } from '../../../shop/services/pictureSizeService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('wobble', [
      transition('false => true', [
        useAnimation(wobbleAnimation)
      ]),
    ])
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  user: authRequest = { username: "", firstname: "", email: "", password: "" };
  registerSubscription: Subscription = new Subscription();
  private passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
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

  protected onWobbleStart(event: AnimationEvent) {
    if (event.fromState !== 'void') {
      this.renderer.addClass(event.element, 'invalid');
    }
  }

  ngOnInit(): void {
    this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
      this.currentImagePath = this.pictureService.currentStaticImage();
    })
  }
  
  isFormValid(): boolean {
    return !!this.user.username.trim() && !!this.user.firstname.trim() && !!this.user.email.trim() && !!this.isPasswordValid();
  }

  isPasswordValid(): boolean {
    return this.passwordRegex.test(this.user.password);
  }

  onSubmit(): void {
    this.registerSubscription = this.authService.registerUser(this.user).pipe(
      catchError((error) => {
        if (error.status == 400 || error.status == 401) {
          this.showError = true;
        }
        this.wobbleField = true;
        return throwError(() => error);
      })
    ).subscribe((response: any) => {
      this.authService.setToken(response.token);
      this.router.navigateByUrl('/shop');
    });

  }


  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
    this.screenSizeSub.unsubscribe();

  }
}