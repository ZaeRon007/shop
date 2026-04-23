import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs';
import { ProductWithQuantity } from '../../../core/models/dto/ProductWithQuantity';
import { pictureSizeService } from '../../services/pictureSizeService';
import { ProductService } from '../../services/productService';
import { UserBasketService } from '../../services/userBasketService';
import { UserWishsService } from '../../services/userWishsService';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent implements OnInit, OnDestroy {
  private sub1: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();
  // product$ = new BehaviorSubject<productEntity>(new productEntity());
  public productWithQuantity$!: Observable<ProductWithQuantity>;
  public isAdmin: boolean = false;
  currentImagePath = '';
  private screenSizeSub = new Subscription();
  private picture: string[] = ['assets/background/commerce-1920px.jpeg'];
  ID: string = "";

  constructor(private basketService: UserBasketService,
    private wishsService: UserWishsService,
    private pictureService: pictureSizeService,
    private productService: ProductService,
    private route: ActivatedRoute) {
      pictureService.setImagesTab(this.picture);
      const input = this.route.snapshot.paramMap.get('id');
      if(input != null)
        this.ID = input;
  }

  ngOnInit(): void {

    // load user basket state
    this.sub1 = this.basketService.getUserBasket().subscribe();

    // load user wish list state
    this.sub2 = this.wishsService.getUserWishs().subscribe();

    this.productWithQuantity$ = this.productService.initProduct(parseInt(this.ID));

    this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
      this.currentImagePath = this.pictureService.currentStaticImage();
    })
  }

  isInWishList(product_id: number): boolean {
    return this.wishsService.wishsSubject.value.some(wish => wish.productId === product_id);
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
  
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.screenSizeSub.unsubscribe();
  }
}
