import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { slideAnimation } from '../../../../animations/slide.animation';
import { BehaviorSubject, Observable } from 'rxjs';

const animationDuration = 300;
const animationInterval = 15000;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        useAnimation(slideAnimation)
      ], {
        params: {
          leaveEnd: '100%',
          enterStart: '-100%',
          hiddenScale: 1,
          duration: animationDuration + 'ms'
        }
      })
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public readonly appTitle = "SHOP";
  screenSize$ = new BehaviorSubject<number>(window.innerWidth);

  images: string[] = [
    "assets/background/city-1920px.jpeg",
    "assets/background/city_path-1920px.jpeg",
    "assets/background/city_and_boat-1920px.jpeg",
  ];

  currentImageIndex = 0;
  animationState = signal(true);
  intervalId: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenSize$.next(event.target.innerWidth);
  }

  currentImage(inputSize: BehaviorSubject<number>): string {
    const size = inputSize.value;
    const picture = this.images[this.currentImageIndex];

    if (size >= 950) {
      return picture;
    }
    else if (size < 950 && size >= 450) {
      const base = picture.replace("-1920px.jpeg", "");
      return `${base}-800px.jpeg`;
    }
    else {
      const base = picture.replace("-1920px.jpeg", "");
        return `${base}-450px.jpeg`;
    }
  }
  
  ngOnInit(): void {
    this.startSlideshow()
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, animationInterval);
  }

  nextImage() {
    this.animationState.set(!this.animationState());
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    setTimeout(() => this.animationState.set(!this.animationState()), animationDuration);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
