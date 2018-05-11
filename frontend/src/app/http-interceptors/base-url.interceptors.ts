import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BACKEND_URL } from '../../environments/environment';
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
        constructor() {
            }
 
export const environment = { production: true
};
export const BACKEND_URL = "https://drumapp-backend.herokuapp.com";
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if(BACKEND_URL) {
         req = req.clone({
url: `${BACKEND_URL}${req.url}` });
// console.log('set to ', `${BACKEND_URL}${req.url}`); }
return next.handle(req); }
}
