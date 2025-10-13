import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";
import { userBasketEntity } from "../../core/models/userBasketEntity";
import { userBasketAddDto } from "../../core/models/dto/userBasketAddDto";

@Injectable({
    providedIn: 'root'
})
export class UserBasketService implements OnDestroy {
    public basket$ = new BehaviorSubject<userBasketEntity[]>([new userBasketEntity])
    private sub: Subscription = new Subscription();
    private sub1: Subscription = new Subscription();
    private sub2: Subscription = new Subscription();
    private sub3: Subscription = new Subscription();


    constructor(private http: HttpClient) {

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
    }

    public getUserBasket(): Observable<userBasketEntity[]> {
        return this.http.get<userBasketEntity[]>(`shop/basket`).pipe(
            tap((product: userBasketEntity[]) => {
                this.basket$.next(product)
            })
        );
    }

    public addToCart(id: number, quantity: number) {
        let cart: userBasketAddDto = new userBasketAddDto();
        cart.quantity = quantity;
        this.addToBasket(id, cart);

        let localItem: userBasketEntity = new userBasketEntity();
        localItem.productId = id;
        localItem.quantity = quantity;
        const updatedBasket = this.basket$.getValue();
        updatedBasket.push(localItem);

        this.basket$.next(updatedBasket);
    }

    public increaseAmount(id: number, quantity: number) {
        let item: userBasketAddDto = new userBasketAddDto();
        item.quantity = quantity + 1;
        this.patchFrombasket(id, item);

        const updatedBasket = this.basket$.getValue().map((p: userBasketEntity) => {
            if (p.productId === id)
                return { ...p, quantity: item.quantity };
            else
                return p;
        })
        this.basket$.next(updatedBasket);
    }

    public decreaseAmount(id: number, quantity: number) {
        let item: userBasketAddDto = new userBasketAddDto();
        if (quantity - 1 == 0) {
            this.deleteFromBasket(id);

            const updatedBasket = this.basket$.getValue().filter(item => item.productId != id);
            this.basket$.next(updatedBasket);
        }
        else {
            item.quantity = quantity - 1;
            this.patchFrombasket(id, item);

            const updatedBasket = this.basket$.getValue().map((p: userBasketEntity) => {
                if (p.productId === id)
                    return { ...p, quantity: item.quantity };
                else
                    return p;
            })
            this.basket$.next(updatedBasket);
        }
    }

    public addToBasket(product_id: number, productToAdd: userBasketAddDto): void {
        this.sub = this.http.post<userBasketAddDto>(`shop/basket/${product_id}`, productToAdd).subscribe();
    }

    public patchFrombasket(product_id: number, productToAdd: userBasketAddDto): void {
        this.sub1 = this.http.patch<userBasketAddDto>(`shop/basket/${product_id}`, productToAdd).subscribe();
    }

    public removeFromBasket(id: number) {
        this.deleteFromBasket(id);
        const updatedBasket = this.basket$.getValue().filter(item => item.productId != id);
        this.basket$.next(updatedBasket);
    }

    public deleteFromBasket(product_id: number): void {
        this.sub2 = this.http.delete(`shop/basket/${product_id}`).subscribe();
    }

    public getItemAmountInUserBasket(product_id: number) {
        return this.http.get<userBasketAddDto>(`shop/basket${product_id}`);
    }

}