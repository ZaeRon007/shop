import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { usernameDto } from "../../core/models/dto/usernameDto";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class userService implements OnDestroy{
    private admin: String = "admin@admin.com"
    private isAdmin$ = new BehaviorSubject<boolean>(false);
    private sub: Subscription = new Subscription();

    constructor(private http: HttpClient) {
        this.checkAdmin();
    }

    /**
     * This function allow to get username
     * @returns an observable of username
     */
    private getUsername(): Observable<usernameDto> {
        return this.http.get<usernameDto>(`${environment.apiUrl}shop/basket/me`);
    }

    /**
     * This function allow to verify if user account is admin
     * @returns a boolean
     */
    private checkAdmin(): void{
        this.sub = this.getUsername().subscribe(response => {
            this.isAdmin$.next(response.username === this.admin);
        });
    }

    /**
     * This function allow to get an observable of isAdmin behavior subject
     * @returns an Observable<boolean>
     */
    public isAccountAdmin$(): Observable<boolean> {
        return this.isAdmin$.asObservable();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}