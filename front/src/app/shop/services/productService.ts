import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, Subscription, switchMap, tap } from "rxjs";
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
    private productWithQuantities$ = new Observable<ProductWithQuantity[]>;

    constructor(private http: HttpClient,
                private basketService: UserBasketService) {

    }

    /**
     * This function allow to get all products from database
     * @returns an observable of product entity
     */
    public getAllProducts(): Observable<productEntity[]> {
        return this.http.get<productEntity[]>(`${environment.apiUrl}products`);
    }

    /**
     * This function allow to get the product list 
     * @returns an observable of product quantity
     */
    public getProductList(): Observable<ProductWithQuantity[]> {
        return this.productWithQuantities$;
    }
    
    /**
     * This function allow to init the product list
     * @returns an observable as a tab of product quantity 
     */
    public initProductList(): Observable<ProductWithQuantity[]> {
        
        return this.getAllProducts().pipe(
            tap(productList => this.productsTab$.next(productList)),
            switchMap(() => 
                combineLatest([
                    this.productsTab$,
                    this.basketService.basket$
                ]).pipe(
                    map(([products, basket]) => {
                        const basketMap = new Map(basket.map(item => [item.productId, item.quantity]));
                        return products.map(p => ({
                            ...p,
                            quantityInBasket: basketMap.get(p.id) ?? 0
                        }));
                    })
                ))
        )
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}