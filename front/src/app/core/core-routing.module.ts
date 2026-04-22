import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { UnAuthGuard } from "./guards/unauth.guard";

const routes: Routes = [
    { path: '', component: LandingPageComponent, canActivate: [UnAuthGuard]},
    { path: 'auth', component: AuthComponent, canActivate: [UnAuthGuard]},
    { path: 'auth/register', component: RegisterComponent, canActivate: [UnAuthGuard]},
    { path: 'auth/logIn', component: LogInComponent, canActivate: [UnAuthGuard]},
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