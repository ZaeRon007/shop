import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'auth', component: AuthComponent},
    { path: 'auth/register', component: RegisterComponent},
    { path: 'auth/logIn', component: LogInComponent},
    { path: '404', component: NotFoundComponent},
  ]
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
    exports: [
      RouterModule
    ]
  })
  export class CoreRoutingModule {
  
  }