import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { map, Observable, Subscription } from 'rxjs';
import { MenuService } from '../../../../../shop/services/menuService';
import { UserBasketService } from '../../../../../shop/services/userBasketService';
import { UserWishsService } from '../../../../../shop/services/userWishsService';

@Component({
  selector: 'app-full-header',
  templateUrl: './full-header.component.html',
  styleUrl: './full-header.component.scss'
})
export class FullHeaderComponent implements OnInit, OnDestroy {
  wishCount$!: Observable<number>;
  cartSize$!: Observable<number>;
  private sub1: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();

  constructor(private authService: AuthService,
    private wishsService: UserWishsService,
    private basketService: UserBasketService,
    public menu: MenuService) {

  }

  ngOnInit(): void {
    this.wishCount$ = this.wishsService.whishs$.pipe(map(list => list.length));
    this.cartSize$ = this.basketService.basket$.pipe(map(list => list.length));

    // load user basket state
    this.sub1 = this.basketService.getUserBasket().subscribe();

    // load user wish list state
    this.sub2 = this.wishsService.getUserWishs().subscribe();
  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
  }

  logOut() {
    this.authService.logOut();
  }

  cartMenu() {
    this.menu.setMenuIndex(3);
  }

}
