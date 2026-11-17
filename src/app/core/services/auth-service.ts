import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable, of, tap, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/interfaces/User';
import { ApiResponse, AuthData, RegisterData } from '../../shared/interfaces/ApiResponse';

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

  register(user: RegisterData): Observable<ApiResponse<{ user: User }>>{
    return this.http.post<ApiResponse<{ user: User }>>(`${this.apiUrl}/register`, user);
  }

  /**
   * Recharger l'utilisateur depuis le backend à partir du token :
   * utilisé au rechargement de la page (F5), quand le token est
   * restauré de localStorage mais que currentUser est null.
   */
  loadUser(): Observable<ApiResponse<{ user: User }>> {
    return this.http.get<ApiResponse<{ user: User }>>(`${this.apiUrl}/user`).pipe(
      tap((response) => this.setUser(response.data.user))
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
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  logout(): Observable<unknown> {
    if (!this.token()) {
      this.clearSession();
      return of(undefined);
    }

    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => this.clearSession()),
      catchError(() => {
        this.clearSession();
        return of(undefined);
      }),
    );
  }
}
