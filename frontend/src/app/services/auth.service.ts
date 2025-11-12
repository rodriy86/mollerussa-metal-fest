import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { configGlobal } from '../configGlobal';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'user';
  isActive: boolean;
  createdAt: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'currentUser';

  constructor() {
    this.loadStoredUser();
  }

  // ✅ Usar backend real - ELIMINADO EL MOCK
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${configGlobal.api.auth}/login`, { 
      email, 
      password 
    }).pipe(
      tap(response => {
        if (response.success && response.token && response.user) {
          this.setSession(response.token, response.user);
        }
      }),
      catchError(this.handleError)
    );
  }

  // ✅ Manejo de errores HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'ERRORES.ERROR_DESCONOCIDO';
    
    if (error.status === 0) {
      errorMessage = 'ERRORES.CONEXION_SERVIDOR';
    } else if (error.status === 400) {
      errorMessage = 'ERRORES.DATOS_INVALIDOS';
    } else if (error.status === 401) {
      // Usar el mensaje del backend si está disponible
      errorMessage = error.error?.message || 'ERRORES.CREDENCIALES_INVALIDAS';
    } else if (error.status === 500) {
      errorMessage = 'ERRORES.ERROR_SERVIDOR';
    }
    
    return throwError(() => ({ 
      success: false, 
      message: errorMessage 
    }));
  }

  // ✅ Verificar si el token está expirado (para tokens mock)
  private isTokenExpired(token: string): boolean {
    try {
      // Solo verificar expiración si es un token mock
      if (token.startsWith('mock-token-')) {
        const tokenData = JSON.parse(atob(token));
        return tokenData.exp < Date.now();
      }
      // Para tokens reales, asumimos que el backend los maneja
      return false;
    } catch {
      return true;
    }
  }

  private setSession(token: string, user: User): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === 'admin' : false;
  }

  isEditor(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === 'editor' : false;
  }

  // ✅ Verificar si el usuario puede editar contenido
  canEditContent(): boolean {
    return this.isAdmin() || this.isEditor();
  }

  // ✅ Verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (this.isLoggedIn()) {
          this.currentUserSubject.next(user);
        } else {
          this.logout(); // Token expirado
        }
      } catch (e) {
        console.error('Error parsing stored user:', e);
        this.logout();
      }
    }
  }

  // ✅ Método para verificar autenticación en guards
  checkAuthentication(): boolean {
    return this.isLoggedIn();
  }
}