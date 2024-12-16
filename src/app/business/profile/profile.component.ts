import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  users: any = null;
  
    constructor(
        private authService: AuthService
      ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const userData = this.authService.getUserStorage(); 
    console.log("usuario data", userData) // Obtén el usuario desde el servicio
    if (userData) {
      this.users = userData;  // Asegúrate de analizarlo como un objeto JSON
    }
  }

}
