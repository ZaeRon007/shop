import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { slideAnimation } from '../../../../animations/slide.animation';
import { BehaviorSubject, combineLatest, map, Observable, startWith, Subscription } from 'rxjs';
import { pictureSizeService } from '../../services/pictureSizeService';

const animationDuration = 300;
const animationInterval = 10000;

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
  private screenSizeSub = new Subscription();
  images: string[] = [
    "assets/background/city-1920px.jpeg",
    "assets/background/city_path-1920px.jpeg",
    "assets/background/city_and_boat-1920px.jpeg",
  ];

  private currentImageIndex$ = new BehaviorSubject<number>(0);
  currentImagePath = '';
  private sub = new Subscription();
  animationState = signal(true);
  intervalId: any;

  constructor(private pictureService: pictureSizeService) {
    pictureService.setImagesTab(this.images);
  }

  ngOnInit(): void {
    this.startSlideshow();
    const combined$ = combineLatest([
      this.currentImageIndex$,
      this.pictureService.screenSize$
    ]).pipe(
      map(([index, _]) => this.pictureService.currentImageFromTab(index))
    );

    this.sub = combined$.subscribe(path => {
      this.currentImagePath = path;
    });
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, animationInterval);
  }

  nextImage() {
    this.animationState.set(!this.animationState());
    const next = (this.currentImageIndex$.value + 1) % this.images.length;
    this.currentImageIndex$.next(next);
    setTimeout(() => this.animationState.set(!this.animationState()), animationDuration);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.screenSizeSub.unsubscribe();
    this.sub.unsubscribe();
  }
}
