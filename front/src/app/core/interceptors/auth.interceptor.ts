import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
        console.log('[AuthInterceptor] intercepted:', req.url);

        const authService = inject(AuthService)
        const authenticationToken = authService.getToken();

        if(authenticationToken){
    
            const modifiedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authenticationToken}`,
                },
            });        
            return next(modifiedReq);
        }
        return next(req);
}