import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor(private router: Router) {

  }

  public register() {
    this.router.navigateByUrl('/auth/register');
  }

  public logIn() {
    this.router.navigateByUrl('/auth/logIn');
  }
}
