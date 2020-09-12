import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { Observable, from } from 'rxjs';

@Injectable()
export class PostInterceptor implements HttpInterceptor {
  token: any;
  newtoken: any;
  constructor(private router: Router, private userservice: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.userservice.getToken()).pipe(
      switchMap((token) => {
        const headersConfig = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };
        if (token) {
          headersConfig['Authorization'] = `beader ${token}`;
        }
        const _req = req.clone({ setHeaders: headersConfig });
        return next.handle(_req);
      })
    );
  }
}
