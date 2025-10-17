import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { userWishsEntity } from "../../core/models/userWishsEntity";
import { productEntity } from "../../core/models/productEntity";

@Injectable({
    providedIn: 'root'
})
export class UserWishsService implements OnDestroy {

    public wishsSubject = new BehaviorSubject<userWishsEntity[]>([]);
    public wishs$ = this.wishsSubject.asObservable();

    private sub: Subscription = new Subscription();
    private sub1: Subscription = new Subscription();

    constructor(private http: HttpClient) { }

    public loadUserWishs(): void {
        this.http.get<userWishsEntity[]>(`${environment.apiUrl}shop/wishs`).subscribe({
            next: (wishs) => this.wishsSubject.next(wishs),
            error: (err) => console.error('Erreur de chargement des souhaits', err)
        });
    }

    public getUserWishs(): Observable<userWishsEntity[]> {
        return this.wishs$;
    }

    public addToWishs(productId: number): void {
        const localWish: userWishsEntity = { productId } as userWishsEntity;

        const updatedWishs = [...this.wishsSubject.value, localWish];
        this.wishsSubject.next(updatedWishs);

        this.sub = this.http.post(`${environment.apiUrl}shop/wishs/${productId}`, null)
            .subscribe({
                error: (err) => console.error('Erreur d’ajout au serveur', err)
            });
    }

    public removeFromWishs(productId: number): void {
        const updatedWishs = this.wishsSubject.value.filter(w => w.productId !== productId);
        this.wishsSubject.next(updatedWishs);

        this.sub1 = this.http.delete(`${environment.apiUrl}shop/wishs/${productId}`)
            .subscribe({
                error: (err) => console.error('Erreur de suppression du serveur', err)
            });
    }

    public getUserWish(productId: number): Observable<productEntity> {
        return this.http.get<productEntity>(`${environment.apiUrl}products/${productId}`);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    }
}
