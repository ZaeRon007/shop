import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { authRequest } from '../../models/auth.interface';
import { animate, AnimationEvent, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('wobble', [
      transition('false => true', [
        animate('0.75s', keyframes([
          style({ transform: 'translateX(-5%)', offset: 0.1 }),
          style({ transform: 'translateX(5%)', offset: 0.3 }),
          style({ transform: 'translateX(-5%)', offset: 0.5 }),
          style({ transform: 'translateX(5%)', offset: 0.7 }),
          style({ transform: 'translateX(-5%)', offset: 0.9 }),
          style({ transform: 'translateX(0)', offset: 1 }),
        ]))
      ]),
    ])
  ]
})
export class RegisterComponent implements OnDestroy {
  user: authRequest = { username: "", firstname: "", email: "", password: "" };
  registerSubscription: Subscription = new Subscription();
  private passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  showError: boolean = false;
  protected wobbleField = false;

  constructor(private router: Router,
    private authService: AuthService,
    private renderer: Renderer2) {
  }

  protected onWobbleStart(event: AnimationEvent) {
    if (event.fromState !== 'void') {
      this.renderer.addClass(event.element, 'invalid');
    }
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
  }
}