import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  users: any = null;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const userData = this.authService.getUserStorage(); 
    console.log("usuario data", userData); // Obtén el usuario desde el servicio
    if (userData) {
      this.users = userData;  // Asegúrate de analizarlo como un objeto JSON
    }
  }

  // Método para verificar si el usuario tiene el rol ADMIN
  isAdmin(): boolean {
    return this.users?.rol?.name === 'ADMIN';  // Verifica si el rol del usuario es ADMIN
  }

  isUser(): boolean {
    return this.users?.rol?.name === 'USER';  // Verifica si el rol del usuario es ADMIN
  }
}
