import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  users: any = null;

  constructor(
      private authService: AuthService
    ) {}
  
    logout(): void {

      this.authService.logout();
    }


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
