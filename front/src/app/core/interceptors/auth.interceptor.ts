import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
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