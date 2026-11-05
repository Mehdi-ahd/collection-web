import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/interfaces/User';
import { ApiResponse, AuthData } from '../../shared/interfaces/ApiResponse';

interface LoginCredentials {
  email: string,
  password: string
}

const TOKEN_KEY = 'auth_token';

@Service()
export class AuthService {

  http = inject(HttpClient);

  apiUrl = environment.apiUrl

  currentUser = signal<User | null>(null);

  token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  login(credentials: LoginCredentials): Observable<ApiResponse<AuthData>>{
    return this.http.post<ApiResponse<AuthData>>(`${this.apiUrl}/login`, credentials).pipe(
      tap( (response) => {
        this.setSession(response.data);
      })
    );
  }

  setUser(user: User) {
    this.currentUser.set(user);
  }

  setSession(data: AuthData) {
    this.token.set(data.token);
    this.setUser(data.user);
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  clearSession() {
    this.setSession({ token: '', user: null as any });
    localStorage.removeItem(TOKEN_KEY);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap( () => {
        this.clearSession();
      })
    );
  }
}
