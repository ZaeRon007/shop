import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, Subscription, tap } from "rxjs";
import { ProductWithQuantity } from "../../core/models/ProductWithQuantity";
import { UserBasketService } from "./userBasketService";
import { ProductService } from "./productService";
import { UserWishsService } from "./userWishsService";
import { productEntity } from "../../core/models/productEntity";

@Injectable({
    providedIn: 'root'
})
export class GlobalService implements OnDestroy {
    private productsTab$ = new BehaviorSubject<productEntity[]>([]);
    private sub: Subscription = new Subscription();
    private sub1: Subscription = new Subscription();



    constructor(private productService: ProductService,
        private basketService: UserBasketService) {
    }

    public Init(): Observable<ProductWithQuantity[]> {

        // load products from database
        this.sub = this.productService.getAllProducts().pipe(
            tap((productsList: productEntity[]) => {
                this.productsTab$.next(productsList)
            })
        ).subscribe();

        // load user basket state
        this.sub1 = this.basketService.getUserBasket().subscribe();

        return combineLatest([
            this.productsTab$,
            this.basketService.basket$
        ]).pipe(
            map(([products, basket]) => {
                const basketMap = new Map(basket.map(item => [item.productId, item.quantity]));

                return products.map(product => ({
                    ...product,
                    quantityInBasket: basketMap.get(product.id) ?? 0
                }));
            })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    }
}