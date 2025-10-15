import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./components/products/products.component";
import { BasketComponent } from "./components/basket/basket.component";
import { WishComponent } from "./components/wish/wish.component";
import { ContactComponent } from "./components/contact/contact.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'basket', component: BasketComponent},
  { path: 'wish', component: WishComponent},
  { path: 'contact', component: ContactComponent}

]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule {

}