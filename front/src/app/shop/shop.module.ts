import { NgModule } from "@angular/core";
import { ShopRoutingModule } from "./shop-routing.module";
import { BasketComponent } from "./components/basket/basket.component";
import { ContactComponent } from "./components/contact/contact.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { CoreModule } from "../core/core.module";
import { WishComponent } from './components/wish/wish.component';
import { AccountComponent } from './components/account/account.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
    declarations: [
        HomeComponent,
        ProductsComponent,
        ContactComponent,
        BasketComponent,
        WishComponent,
        AccountComponent,
        SideNavComponent,
    ],
    imports: [
        ShopRoutingModule,
        CoreModule
    ],
    exports: [
        HomeComponent,
        ProductsComponent,
        ContactComponent,
        BasketComponent,
    ],
  })
  export class ShopModule { }
  