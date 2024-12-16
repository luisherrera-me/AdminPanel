import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { CreateUserComponent } from '../../components/create-user/create-user.component';
import { ViewUserComponent } from '../../components/view-user/view-user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  users: any[] = [];  // Array para almacenar los datos de los usuarios
    selectedUser: any = null;  // Usuario seleccionado para editar
    filteredUsers: any[] = []; // Lista de usuarios filtrados por búsqueda
    searchQuery: string = ''; // Texto de búsqueda
    private searchSubject: Subject<string> = new Subject<string>();
  
    constructor(
        private authService: AuthService,
        public dialog: MatDialog
      ) {}
  
      ngOnInit(): void {
        this.loadUsers();
      
        // Suscripción para buscar cuando se escribe
        this.searchSubject.pipe(
          debounceTime(500) // Espera 500ms después de escribir para hacer la búsqueda
        ).subscribe(query => {
          this.filterUsers(query);
        });
      }
  
      loadUsers(): void {
        this.authService.getAllUser().subscribe((data) => {
          this.users = data.data;
          this.filteredUsers = [...this.users];  // Inicializar filteredUsers con todos los usuarios
          console.log(this.users);  // Aquí se almacenan los usuarios que devuelve la API
        });
      }
  
    
    viewUser(user: any): void {
      const dialogRef = this.dialog.open(ViewUserComponent, {
        data: user
      });
    
      dialogRef.afterClosed().subscribe(result => {
        this.loadUsers();  
      });
    }
  
  
    filterUsers(query: string): void {
      if (query) {
        this.filteredUsers = this.users.filter(user =>
          user.name.toLowerCase().includes(query.toLowerCase()) // Filtra usuarios por nombre
        );
      } else {
        this.filteredUsers = this.users; // Si no hay búsqueda, muestra todos los usuarios
      }
    }
  
    onSearch(): void {
      this.searchSubject.next(this.searchQuery); // Emitir el texto de búsqueda
    }
  
    clearSearch(): void {
      this.searchQuery = '';
      this.filteredUsers = this.users; // Limpiar búsqueda y mostrar todos los usuarios
    }
}
