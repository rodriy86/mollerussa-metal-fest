import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (requiredRole: string): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    return authService.hasRole(requiredRole);
  };
};