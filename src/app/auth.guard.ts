import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServicesService } from './services/auth-services.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServicesService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuth = this.authService.isAuthenticated();
    //console.log('Guard check - isAuthenticated:', isAuth);

    const expectedRoles = route.data['roles']; // Get expected roles from route
    const user = this.authService.getUser(); // Get current user

    // Check if user is authenticated and token is valid
    if (!isAuth || this.authService.isTokenExpired()) {
      this.router.navigate(['/courses/login']);
      return false;
    }

    // If roles are defined, check if user has the expected role
    if (expectedRoles && user && !expectedRoles.includes(user.roleId)) {
      this.router.navigate(['/']); // Redirect to home if role doesn't match
      return false;
    }

    return true;
  }
}
