import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { userInfosDto } from '../../../core/models/dto/userInfosDto';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnDestroy {
  user = new userInfosDto();
  userSaved = new userInfosDto();
  getSub = new Subscription();
  putSub = new Subscription();

  constructor(private authService: AuthService) {
    this.getUserInfos();
  }

  logOut() {
    this.authService.logOut();
  }

  getUserInfos() {
    this.getSub = this.authService.getUserInfos().subscribe((response: userInfosDto) => {
      this.user.id = response.id;
      this.user.email = response.email;
      this.user.firstname = response.firstname;
      this.user.username = response.username;

      this.userSaved.email = response.email;
      this.userSaved.firstname = response.firstname;
      this.userSaved.username = response.username;
    });
  }

  putUserInfos() {
    this.putSub = this.authService.putUserInfos(this.user).subscribe();
  }

  isFormValid() {
    return (((this.user.email != "") && (this.user.firstname != "") && (this.user.username != "")) &&
      ((this.user.email != this.userSaved.email) || (this.user.username != this.userSaved.username) || (this.user.firstname != this.userSaved.firstname)));
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.putSub.unsubscribe();
  }
}
