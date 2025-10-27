import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pictureSizeService } from '../../../shop/services/pictureSizeService';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy {
  private picture: string[] = ['assets/background/shop-1920px.jpeg'];
  private screenSizeSub = new Subscription();

  currentImagePath = '';

  constructor(private router: Router,
    private pictureService: pictureSizeService) {
      pictureService.setImagesTab(this.picture);
  }

  ngOnInit(): void {
    this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
      this.currentImagePath = this.pictureService.currentStaticImage();
    })
  }
  public register() {
    this.router.navigateByUrl('/auth/register');
  }

  public logIn() {
    this.router.navigateByUrl('/auth/logIn');
  }



  ngOnDestroy(): void {
    this.screenSizeSub.unsubscribe();
  }
}
