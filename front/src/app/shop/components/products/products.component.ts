import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { productEntity } from '../../../core/models/productEntity';
import { UserBasketService } from '../../services/userBasketService';
import { UserWishsService } from '../../services/userWishsService';
import { ProductWithQuantity } from '../../../core/models/ProductWithQuantity';
import { GlobalService } from '../../services/globalService';
import { userService } from '../../services/userService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private sub1: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();
  private sub3: Subscription = new Subscription();
  private sub4: Subscription = new Subscription();
  productsTab$ = new BehaviorSubject<productEntity[]>([]);
  public productsWithQuantities$!: Observable<ProductWithQuantity[]>;
  public isAdmin: boolean = false;

  constructor(private globalService: GlobalService,
    private basketService: UserBasketService,
    private wishsService: UserWishsService,
    private userService: userService) {
  }

  ngOnInit(): void {

    // load user basket state
    this.sub1 = this.basketService.getUserBasket().subscribe();

    // load user wish list state
    this.sub2 = this.wishsService.getUserWishs().subscribe();

    this.productsWithQuantities$ = this.globalService.Init();

    this.sub4 = this.userService.isAccountAdmin$().subscribe(res => {
      if(res)
        this.isAdmin = true;
      else
        this.isAdmin = false;
    })
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }

  isInWishList(product_id: number): boolean {
    return this.wishsService.whishs$.value.some(wish => wish.productId === product_id);
  }

  addToWishs(id: number) {
    this.wishsService.addToWishs(id);
  }

  removeFromWishs(id: number) {
    this.wishsService.removeFromWishs(id);
  }

  addToCart(id: number, quantity: number) {
    this.basketService.addToCart(id, quantity);
  }

  increaseAmount(id: number, quantity: number) {
    this.basketService.increaseAmount(id, quantity);
  }

  decreaseAmount(id: number, quantity: number) {
    this.basketService.decreaseAmount(id, quantity);
  }
}
