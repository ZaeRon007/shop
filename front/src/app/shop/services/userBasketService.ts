import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";
import { userBasketEntity } from "../../core/models/userBasketEntity";
import { userBasketAddDto } from "../../core/models/dto/userBasketAddDto";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserBasketService implements OnDestroy {
    public basketSubject = new BehaviorSubject<userBasketEntity[]>([])
    public basket$ = this.basketSubject.asObservable();

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

    /**
     * This function allow to store user basket
     */
    public loadUserBasket() {
        this.sub3 = this.http.get<userBasketEntity[]>(`${environment.apiUrl}shop/basket`).subscribe({
            next: (item) => this.basketSubject.next(item),
            error: (err) => console.error('Erreur de chargement du panier', err)

        });
    }

    /**
     * This function allow to get user basket 
     * @returns 
     */
    public getUserBasket(): Observable<userBasketEntity[]> {
        return this.basket$;
    }

    /**
     * This function allow to add a product to user basket as a user
     * @param id 
     * @param quantity 
     */
    public addToCart(id: number, quantity: number) {
        let cart: userBasketAddDto = new userBasketAddDto();
        cart.quantity = quantity;
        this.addToBasket(id, cart);

        let localItem: userBasketEntity = new userBasketEntity();
        localItem.productId = id;
        localItem.quantity = quantity;
        const updatedBasket = this.basketSubject.getValue();
        updatedBasket.push(localItem);

        this.basketSubject.next(updatedBasket);
    }

    /**
     * This function allow to increase product quantity in user basket
     * @param id 
     * @param quantity 
     */
    public increaseAmount(id: number, quantity: number) {
        let item: userBasketAddDto = new userBasketAddDto();
        item.quantity = quantity + 1;
        this.patchFrombasket(id, item);

        const updatedBasket = this.basketSubject.getValue().map((p: userBasketEntity) => {
            if (p.productId === id)
                return { ...p, quantity: item.quantity };
            else
                return p;
        })
        this.basketSubject.next(updatedBasket);
    }

    /**
     * This function allow to decrease a product quantity in user basket
     * @param id 
     * @param quantity 
     */
    public decreaseAmount(id: number, quantity: number) {
        let item: userBasketAddDto = new userBasketAddDto();
        if (quantity - 1 == 0) {
            this.removeFromBasket(id);

            const updatedBasket = this.basketSubject.getValue().filter(item => item.productId != id);
            this.basketSubject.next(updatedBasket);
        }
        else {
            item.quantity = quantity - 1;
            this.patchFrombasket(id, item);

            const updatedBasket = this.basketSubject.getValue().map((p: userBasketEntity) => {
                if (p.productId === id)
                    return { ...p, quantity: item.quantity };
                else
                    return p;
            })
            this.basketSubject.next(updatedBasket);
        }
    }

    /**
     * This function allow to add a product in basket 
     * @param product_id 
     * @param productToAdd 
     */
    private addToBasket(product_id: number, productToAdd: userBasketAddDto): void {
        this.sub = this.http.post<userBasketAddDto>(`${environment.apiUrl}shop/basket/${product_id}`, productToAdd).subscribe();
    }

    /**
     * This function allow to update a product quantity in basket 
     * @param product_id 
     * @param productToAdd 
     */
    private patchFrombasket(product_id: number, productToAdd: userBasketAddDto): void {
        this.sub1 = this.http.patch<userBasketAddDto>(`${environment.apiUrl}shop/basket/${product_id}`, productToAdd).subscribe();
    }

    /**
     * This function allow to remove a product from user basket
     * @param id 
     */
    private removeFromBasket(id: number) {
        const updatedBasket = this.basketSubject.getValue().filter(item => item.productId != id);
        this.basketSubject.next(updatedBasket);

        this.sub2 = this.http.delete(`${environment.apiUrl}shop/basket/${id}`)
            .subscribe({
                error: (err) => console.error('Erreur de suppression du serveur', err)
            });
    }

    /**
     * This function allow to get item amount in user basket
     * @param product_id 
     * @returns a number
     */
    public getItemAmountInUserBasket(product_id: number) {
        return this.http.get<userBasketAddDto>(`${environment.apiUrl}shop/basket${product_id}`);
    }

}