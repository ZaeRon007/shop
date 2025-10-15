import { NgModule } from "@angular/core";
import { ShopRoutingModule } from "./shop-routing.module";
import { BasketComponent } from "./components/basket/basket.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ContainerComponent } from "./components/container/container.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { CoreModule } from "../core/core.module";
import { WishComponent } from './components/wish/wish.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
    declarations: [
        HomeComponent,
        ProductsComponent,
        ContainerComponent,
        ContactComponent,
        BasketComponent,
        WishComponent,
        AccountComponent,
    ],
    imports: [
        ShopRoutingModule,
        CoreModule
    ],
    exports: [
        HomeComponent,
        ProductsComponent,
        ContainerComponent,
        ContactComponent,
        BasketComponent,
    ],
  })
  export class ShopModule { }
  