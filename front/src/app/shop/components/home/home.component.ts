import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { slideAnimation } from '../../../../animations/slide.animation';

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
          duration: animationDuration + 'ms' } 
      })
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy{
  public readonly appTitle = "SHOP";
  images: string[] = [
    "assets/background/city.jpeg",
    "assets/background/city2.jpeg",
    "assets/background/path.jpeg",
  ];

  currentImageIndex = 0;
  animationState = signal(true);
  intervalId: any;

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

  get currentImage() {
    return this.images[this.currentImageIndex];
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
