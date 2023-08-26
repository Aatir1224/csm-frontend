import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  private totalRequests = 0;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.authService.setLoading(true);
    this.spinner.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.authService.setLoading(false);
          this.spinner.hide();
        }
      })
    );
  }
}
