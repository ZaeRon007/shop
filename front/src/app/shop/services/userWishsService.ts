import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, take, tap } from "rxjs";
import { userWishsEntity } from "../../core/models/userWishsEntity";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserWishsService implements OnDestroy {
    public whishs$ = new BehaviorSubject<userWishsEntity[]>([new userWishsEntity]);
    private sub: Subscription = new Subscription();
    private sub1: Subscription = new Subscription();

    constructor(private http: HttpClient) {

    }

    public getUserWishs(): Observable<userWishsEntity[]> {
        return this.http.get<userWishsEntity[]>(`shop/wishs`).pipe(
            tap((wish: userWishsEntity[]) => {
                this.whishs$.next(wish)
            })
        );
    }


    public addToWishs(id: number) {
        this.postToWishs(id);
        let localWish: userWishsEntity = new userWishsEntity;
        localWish.productId = id;
        const updatedWishs = this.whishs$.getValue();
        updatedWishs.push(localWish);

        this.whishs$.next(updatedWishs);
    }

    public postToWishs(product_id: number): void {
        this.sub = this.http.post(`shop/wishs/${product_id}`, null).subscribe();
    }

    public removeFromWishs(id: number) {
        this.deleteFromWishs(id);
        const updatedWishs = this.whishs$.getValue().filter(wish => wish.productId != id);
        this.whishs$.next(updatedWishs);
    }

    public deleteFromWishs(product_id: number): void {
        this.sub1 = this.http.delete(`shop/wishs/${product_id}`).subscribe();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    }
}