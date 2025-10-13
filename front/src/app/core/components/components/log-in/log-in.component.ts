import { Component } from '@angular/core';
import { loginRequest } from '../../models/dto/loginRequest.interface';
import { catchError, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  user: loginRequest = { email: "", password: "" };
  logInSubscription: Subscription = new Subscription();
  showError: boolean = false;


  constructor(private router: Router,
    private authService: AuthService) { }


  isFormValid(): boolean {
    return !!this.user.password.trim() && !!this.user.email.trim();
  }


  onSubmit(): void {
    this.logInSubscription = this.authService.loginUser(this.user).pipe(
      catchError((error) => {
        if (error.status == 400 || error.status == 401) {
          this.showError = true;
        }
        return throwError(() => error);
      })
    ).subscribe((response: any) => {
      this.authService.setToken(response.token);
      this.router.navigateByUrl(`/shop/home`);
    });
  }

  ngOnDestroy(): void {
    this.logInSubscription.unsubscribe();
  }

}
