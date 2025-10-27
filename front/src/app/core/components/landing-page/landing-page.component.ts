import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { pictureSizeService } from '../../../shop/services/pictureSizeService';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit, OnDestroy{
  private picture: string[] = ['assets/background/shop-1920px.jpeg'];
  private screenSizeSub = new Subscription();
  currentImagePath = '';

  constructor(private router: Router,
    private pictureService: pictureSizeService){

      pictureService.setImagesTab(this.picture);
  }

  ngOnInit(): void {
      this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
        this.currentImagePath = this.pictureService.currentStaticImage();
      })
  }
  public readonly appTitle = "Shop";

  public start(){
    this.router.navigateByUrl('/auth');
  }

  ngOnDestroy(): void {
      this.screenSizeSub.unsubscribe();
  }
}
