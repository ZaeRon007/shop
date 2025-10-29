import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const authenticationToken = authService.getToken();

    const clonedReq = authenticationToken
        ? req.clone({
            setHeaders: { Authorization: `Bearer ${authenticationToken}` },
        })
        : req;

    return next(clonedReq).pipe(
        catchError((error) => {
            if (error.status === 401) {
                authService.logOut();
                router.navigateByUrl('');
            }
            return throwError(() => error);
        })
    );
}