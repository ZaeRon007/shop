import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menuIndex$ = new BehaviorSubject<Number>(0);

    public setMenuIndex(id: Number) {
        this.menuIndex$.next(id) ;
    }

    public getMenuIndex(): Number {
        return this.menuIndex$.value;
    };
}