import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContainerComponent } from "./components/container/container.component";

const routes: Routes = [
  { path: 'home', component: ContainerComponent },

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