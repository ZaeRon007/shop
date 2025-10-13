import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { authRequest } from '../../models/auth.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  user: authRequest = { username: "", firstname: "", email: "", password: "" };
  registerSubscription: Subscription = new Subscription();
  private passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  showError: boolean = false;

  constructor(private router: Router,
    private authService: AuthService) {
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