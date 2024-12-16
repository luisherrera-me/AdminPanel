import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = this.authService.getUserStorage();

    // Verifica si el usuario tiene el rol ADMIN
    if (user?.rol?.name === 'ADMIN') {
      return true;  // Permite el acceso
    }

    // Si no tiene rol ADMIN, redirige al dashboard u otra ruta segura
    this.router.navigate(['/dashboard']);
    return false;
  }
}


