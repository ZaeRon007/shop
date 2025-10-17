import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserBasketService } from '../../services/userBasketService';
import { BehaviorSubject, combineLatest, map, Observable, Subscription, tap } from 'rxjs';
import { productEntity } from '../../../core/models/productEntity';
import { ProductService } from '../../services/productService';
import { ProductWithQuantity } from '../../../core/models/ProductWithQuantity';
import { GlobalService } from '../../services/globalService';
import { userBasketEntity } from '../../../core/models/userBasketEntity';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  productsTab$ = new BehaviorSubject<productEntity[]>([]);
  private sub1: Subscription = new Subscription();
  public productsWithQuantities$!: Observable<ProductWithQuantity[]>;
  basketLength = 0;

  constructor(private basketService: UserBasketService,
    private globalService: GlobalService) {
  }

  ngOnInit(): void {
    // load user basket state
    this.sub1 = this.basketService.getUserBasket().subscribe((res: userBasketEntity[]) => {
      this.basketLength = res.length;
      console.log("basket length :", this.basketLength);
    });

    // combine latest updates and insert item quantity into productsWithQuantities
    this.productsWithQuantities$ = this.globalService.Init();

  }

  deleteFrombasket(id: number) {
    this.basketService.removeFromBasket(id);
    this.updateBasketLength();
  }

  increase(productId: number, quantity: number) {
    this.basketService.increaseAmount(productId, quantity);
    this.updateBasketLength();
  }

  decrease(productId: number, quantity: number) {
    this.basketService.decreaseAmount(productId, quantity);
    this.updateBasketLength();
  }

  updateBasketLength() {
    this.basketLength = this.basketService.basket$.getValue.length;
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

}
