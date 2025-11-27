import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, Subscription, tap } from "rxjs";
import { productEntity } from "../../core/models/productEntity";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { UserBasketService } from "./userBasketService";
import { ProductWithQuantity } from "../../core/models/ProductWithQuantity";

@Injectable({
    providedIn: 'root'
})
export class ProductService implements OnDestroy{
    private sub: Subscription = new Subscription();
    private productsTab$ = new BehaviorSubject<productEntity[]>([]);

    constructor(private http: HttpClient,
                private basketService: UserBasketService) {

    }

    public getAllProducts(): Observable<productEntity[]> {
        return this.http.get<productEntity[]>(`${environment.apiUrl}products`);
    }

    public initProductList(): Observable<ProductWithQuantity[]> {

        // load products from database
        this.sub = this.getAllProducts().pipe(
            tap((productsList: productEntity[]) => {
                this.productsTab$.next(productsList)
            })
        ).subscribe();

        // load user basket state
        this.basketService.loadUserBasket();

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
    }
}