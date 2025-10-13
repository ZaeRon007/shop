import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { productEntity } from "../../core/models/productEntity";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) {

    }

    public getAllProducts(): Observable<productEntity[]> {
        return this.http.get<productEntity[]>(`products`);
    }
    
}