import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private routeService: RouteService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if user is admin
    if (this.authService.isAdmin) {
      return true; // Allow access to the component
    } else {
      // Redirect or handle unauthorized access
      // For example, redirect to login page
      // Replace '/login' with the appropriate route
      // You may also want to store the attempted URL to redirect back after login
      this.routeService.navigateToLogin();
      return false;
    }
  }
}
