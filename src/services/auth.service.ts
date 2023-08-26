import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private isAuthenticatedUser: boolean = false;
  private loading: boolean = false;

  constructor(private http: HttpClient) {}

  register(userData: FormData): Observable<any> {
    return this.http.post(environment.apiUrl + '/user/signup', userData);
  }

  login(data: any) {
    return this.http.post(environment.apiUrl + '/user/login', data);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    return this.http.get(environment.apiUrl + '/user/logout');
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated() {
    const token = this.getToken();
    // Check if the token is valid and not expired
    if (token) {
      this.isAuthenticatedUser = true;
      return true;
    }
    return false;
    // return !!token;
  }
  getUserDetails() {
    const token = this.getToken();
    // Send a request to the server to get user details using the token
    return this.http.get(environment.apiUrl + '/user/getMe', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
