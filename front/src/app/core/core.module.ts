import { CommonModule } from "@angular/common";
import { LOCALE_ID, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoreRoutingModule } from "./core-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { AuthGuard } from "./guards/auth.guard";
import { UnAuthGuard } from "./guards/unauth.guard";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { AuthComponent } from "./components/auth/auth.component";
import { FullHeaderComponent } from "./components/headers/full-header/full-header.component";
import { SimpleHeaderComponent } from "./components/headers/simple-header/simple-header.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";

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
        CommonModule,
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
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        AuthGuard,
        UnAuthGuard,
        provideHttpClient(withInterceptors([AuthInterceptor])),
    ],
  })
  export class CoreModule { }
