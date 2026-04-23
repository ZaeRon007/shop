import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { productEntity } from '../../../core/models/productEntity';
import { UserBasketService } from '../../services/userBasketService';
import { UserWishsService } from '../../services/userWishsService';
import { ProductWithQuantity } from '../../../core/models/dto/ProductWithQuantity';
import { pictureSizeService } from '../../services/pictureSizeService';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsTab$ = new BehaviorSubject<productEntity[]>([]);
  public productsWithQuantities$!: Observable<ProductWithQuantity[]>;
  public isAdmin: boolean = false;
  currentImagePath = '';
  private screenSizeSub = new Subscription();
  private picture: string[] = ['assets/background/commerce-1920px.jpeg'];

  constructor(private pictureService: pictureSizeService,
    private productService: ProductService) {
      pictureService.setImagesTab(this.picture);
  }

  ngOnInit(): void {
    this.productsWithQuantities$ = this.productService.initProductList();

    this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
      this.currentImagePath = this.pictureService.currentStaticImage();
    })
  }
  
  ngOnDestroy(): void {
    this.screenSizeSub.unsubscribe();
  }
}
