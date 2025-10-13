import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserBasketService } from '../../services/userBasketService';
import { BehaviorSubject, combineLatest, map, Observable, Subscription, tap } from 'rxjs';
import { productEntity } from '../../../core/models/productEntity';
import { ProductService } from '../../services/productService';
import { ProductWithQuantity } from '../../../core/models/ProductWithQuantity';
import { GlobalService } from '../../services/globalService';

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

  constructor(private basketService: UserBasketService,
    private globalService: GlobalService) {
  }

  ngOnInit(): void {
    // load user basket state
    this.sub1 = this.basketService.getUserBasket().subscribe();

    // combine latest updates and insert item quantity into productsWithQuantities
    this.productsWithQuantities$ = this.globalService.Init();

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
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

}
