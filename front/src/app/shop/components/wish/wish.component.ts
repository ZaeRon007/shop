import { Component } from '@angular/core';
import { Subscription, BehaviorSubject, forkJoin, switchMap } from 'rxjs';
import { productEntity } from '../../../core/models/productEntity';
import { UserWishsService } from '../../services/userWishsService';
import { userWishsEntity } from '../../../core/models/userWishsEntity';
import { pictureSizeService } from '../../services/pictureSizeService';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.scss'
})
export class WishComponent {
  wishsTab$ = new BehaviorSubject<productEntity[]>([]);
  wishsLength = 0;
  currentImagePath = '';
  private screenSizeSub = new Subscription();
  private picture: string[] = ['assets/background/wishlist-1920px.jpeg'];
  private sub: Subscription = new Subscription();

  constructor(private wishService: UserWishsService,
              private pictureService: pictureSizeService) {
    pictureService.setImagesTab(this.picture);
  }

  ngOnInit(): void {
    this.sub = this.wishService.getUserWishs().pipe(
      switchMap((wishs: userWishsEntity[]) => {
        this.wishsLength = wishs.length;
        const requests = wishs.map(wish => this.wishService.getUserWish(wish.productId));
        return forkJoin(requests);
      })
    ).subscribe({
      next: (products) => {
        this.wishsTab$.next(products);
      },
      error: (err) => console.error(err)
    });

    this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
      this.currentImagePath = this.pictureService.currentStaticImage();
    })
  }

  deleteFromWishs(id: number) {
    this.wishService.removeFromWishs(id);
    const updatedWishs = this.wishsTab$.getValue().filter(wish => wish.id != id);
    this.wishsTab$.next(updatedWishs);
    this.wishsLength = this.wishsTab$.getValue().length;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.screenSizeSub.unsubscribe();
  }
}
