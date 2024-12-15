import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  tokenEmail: string | null = null;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  login(): void {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    
    // Primero, realiza el login
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Si el token está presente, buscar por el email
        this.authService.searchByEmail(this.email).subscribe({
          next: (response) => {
            console.log('Respuesta de búsqueda por email:', response);
            // Navegar al dashboard
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Error al buscar por email:', err);
            Swal.fire({
              title: 'Error',
              text: err?.error?.error || 'Ocurrió un error inesperado',
              icon: 'error',
              confirmButtonColor: '#6B46C1',
            });
          }
        });
      },
      error: (err) => {
        console.error('Login Fallido', err);
        Swal.fire({
          title: 'Error al iniciar sesión',
          text: err?.error?.error || 'Ocurrió un error inesperado',
          icon: 'error',
          confirmButtonColor: '#6B46C1', // Color similar a tu tema (Tailwind's purple-700)
        });
      }
    });
  }
}


