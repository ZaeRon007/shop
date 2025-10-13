import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoreRoutingModule } from "./core-routing.module";
import { AuthComponent } from "./components/components/auth/auth.component";
import { LandingPageComponent } from "./components/components/landing-page/landing-page.component";
import { LogInComponent } from "./components/components/log-in/log-in.component";
import { RegisterComponent } from "./components/components/register/register.component";
import { NotFoundComponent } from "./components/components/not-found/not-found.component";
import { FullHeaderComponent } from "./components/components/headers/full-header/full-header.component";
import { SimpleHeaderComponent } from "./components/components/headers/simple-header/simple-header.component";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { FormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    declarations: [
        AuthComponent,
        LandingPageComponent,
        LogInComponent,
        RegisterComponent,
        NotFoundComponent,
        FullHeaderComponent,
        SimpleHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        CoreRoutingModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatGridListModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
    ],
    exports: [
        AuthComponent,
        LandingPageComponent,
        LogInComponent,
        RegisterComponent,
        NotFoundComponent,
        FullHeaderComponent,
        SimpleHeaderComponent,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatGridListModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
    ],
  })
  export class CoreModule { }
  