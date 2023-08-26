import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  token = this.authService.getToken();
  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadImageForFreeTier(data: FormData) {
    return this.http.post(
      environment.apiUrl + '/userImage/upload-free-tier-image',
      data,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }
  uploadImageForProTier(data: FormData) {
    return this.http.post(
      environment.apiUrl + '/userImage/upload-pro-tier-image',
      data,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }
  subscribe(email: string, paymenttoken: string) {
    return this.http.post(
      environment.apiUrl + '/user/subscribe',
      { email, paymenttoken },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  cancelSubscription(email: string) {
    return this.http.post(
      environment.apiUrl + '/user/cancel-subscription',
      { email },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }
  checkSubscriptionStatus(email: string) {
    return this.http.get(
      environment.apiUrl + `/user/check-subscription?email=${email}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }
}
