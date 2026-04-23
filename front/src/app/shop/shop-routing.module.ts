import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./components/products/products.component";
import { BasketComponent } from "./components/basket/basket.component";
import { WishComponent } from "./components/wish/wish.component";
import { ContactComponent } from "./components/contact/contact.component";
import { HomeComponent } from "./components/home/home.component";
import { AccountComponent } from "./components/account/account.component";
import { SingleProductComponent } from './components/single-product/single-product.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: {animation: 'HomePage'} },
  { path: 'products', component: ProductsComponent, data: {animation: 'ProductsPage'}},
  { path: 'basket', component: BasketComponent, data: {animation: 'basketPage'}},
  { path: 'wish', component: WishComponent, data: {animation: 'WishPage'}},
  { path: 'contact', component: ContactComponent, data: {animation: 'ContactPage'}},
  { path: 'account', component: AccountComponent, data: {animation: 'AccountPage'}},
  { path: 'product/view/:id', component: SingleProductComponent, data: {animation: 'ProductsPage'}}

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