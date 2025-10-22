import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { userInfosDto } from '../../../core/models/dto/userInfosDto';
import { pictureSizeService } from '../../services/pictureSizeService';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit, OnDestroy {
  user = new userInfosDto();
  screenSize$ !: BehaviorSubject<number>;
  private picture: string[] = ['assets/background/account-1920px.jpeg'];
  userSaved = new userInfosDto();
  getSub = new Subscription();
  putSub = new Subscription();
  private screenSizeSub = new Subscription();

  currentImagePath = '';


  constructor(private authService: AuthService,
    private pictureService: pictureSizeService) {

    this.getUserInfos();
    pictureService.setImagesTab(this.picture);
  }
  ngOnInit(): void {
      this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
        this.currentImagePath = this.pictureService.currentStaticImage();
      })
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
    this.screenSizeSub.unsubscribe();
  }
}
