import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {

    if (req.url.startsWith('/')) {
        const cloned = req.clone({
            url: environment.apiUrl + req.url
        })
        return next(cloned);
    }

    return next(req);
};
