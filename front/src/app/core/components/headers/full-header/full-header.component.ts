import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { count, map, Observable, Subscription } from 'rxjs';
import { UserBasketService } from '../../../../shop/services/userBasketService';
import { UserWishsService } from '../../../../shop/services/userWishsService';

@Component({
  selector: 'app-full-header',
  templateUrl: './full-header.component.html',
  styleUrl: './full-header.component.scss'
})
export class FullHeaderComponent implements OnInit, OnDestroy {
  wishCount: number = 0;
  cartSize: number = 0;
  private sub1: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();

  constructor(private authService: AuthService,
    private wishsService: UserWishsService,
    private basketService: UserBasketService) {

  }

  ngOnInit(): void {
    this.sub1 = this.wishsService.whishs$.pipe(map(list => list.length)).subscribe(count => this.wishCount = count);
    this.sub2 = this.basketService.basket$.pipe(map(list => list.length)).subscribe(count => this.cartSize = count);
  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
  }
}
