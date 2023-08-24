import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = JSON.stringify(localStorage.getItem('token'));
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post('/user/signup', userData);
  }

  login(data: any) {
    return this.http.post(environment.apiUrl + '/user/login', data);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Check if the token is valid and not expired
    return !!token;
  }
  getUserDetails() {
    const token = this.getToken();
    // Send a request to the server to get user details using the token
    return this.http.get('/user', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
