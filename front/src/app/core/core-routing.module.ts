import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/components/landing-page/landing-page.component";
import { AuthComponent } from "./components/components/auth/auth.component";
import { LogInComponent } from "./components/components/log-in/log-in.component";
import { NotFoundComponent } from "./components/components/not-found/not-found.component";
import { RegisterComponent } from "./components/components/register/register.component";

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