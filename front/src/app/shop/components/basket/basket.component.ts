import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserBasketService } from '../../services/userBasketService';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { productEntity } from '../../../core/models/productEntity';
import { ProductWithQuantity } from '../../../core/models/ProductWithQuantity';
import { userBasketEntity } from '../../../core/models/userBasketEntity';
import { pictureSizeService } from '../../services/pictureSizeService';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit, OnDestroy {
  productsTab$ = new BehaviorSubject<productEntity[]>([]);
  private picture: string[] = ['assets/background/basket-1920px.jpeg'];
  basketLength = 0;
  private basketSubscription: Subscription = new Subscription();
  public productsWithQuantities$!: Observable<ProductWithQuantity[]>;
  private screenSizeSub = new Subscription();
  currentImagePath = '';

  constructor(private basketService: UserBasketService,
    private pictureService: pictureSizeService,
    private productService: ProductService,) {
      pictureService.setImagesTab(this.picture);
  }

  ngOnInit(): void {
    // load user basket state
    this.basketSubscription = this.basketService.basket$.subscribe((basket: userBasketEntity[]) => {
      this.basketLength = basket.length;
    });

    this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
      this.currentImagePath = this.pictureService.currentStaticImage();
    })

    // combine latest updates and insert item quantity into productsWithQuantities
    this.productsWithQuantities$ = this.productService.initProductList();

  }

  deleteFrombasket(id: number) {
    this.basketService.removeFromBasket(id);
  }

  increase(productId: number, quantity: number) {
    this.basketService.increaseAmount(productId, quantity);
  }

  decrease(productId: number, quantity: number) {
    this.basketService.decreaseAmount(productId, quantity);
  }

  ngOnDestroy(): void {
    this.basketSubscription.unsubscribe();
    this.screenSizeSub.unsubscribe();
  }

}
