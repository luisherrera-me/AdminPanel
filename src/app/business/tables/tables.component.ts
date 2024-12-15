import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserComponent } from '../../components/view-user/view-user.component';

@Component({
  selector: 'app-tables',
  imports: [CommonModule],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  users: any[] = [];  // Array para almacenar los datos de los usuarios
  selectedUser: any = null;  // Usuario seleccionado para editar

  constructor(
      private authService: AuthService,
      public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUser().subscribe((data) => {
      this.users = data.data;
      console.log(this.users);  // Aquí se almacenan los usuarios que devuelve la API
    });
  }

  deleteUser(id: string): void {
    this.authService.deleteUser(id).subscribe(
      () => {
        // Eliminar el usuario de la lista local
        this.users = this.users.filter(user => user.id !== id);
        console.log(`Usuario con id ${id} eliminado`);
      },
      (error) => {
        console.error('Error al eliminar usuario', error);
      }
    );
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();  
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

}