import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authLoginGuard } from './core/guards/auth-login.guard';


export const routes: Routes = [
    {
      path: 'sign-in',
      loadComponent: () => import('./modules/auth/sign-in/sign-in.component').then(m => m.SignInComponent),
      canActivate: [authLoginGuard]
    },
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.DashboardComponent),
                canActivate: [authGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component').then(m => m.ProfileComponent),
                canActivate: [authGuard]
            },
            {
                path: 'tables',
                loadComponent: () => import('./business/tables/tables.component').then(m => m.TablesComponent),
                canActivate: [authGuard]
            },
            {
                path: '',
                redirectTo: 'dashboard', 
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard', 
    },
  ];
