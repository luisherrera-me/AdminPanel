import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  @Output() updateUserEvent = new EventEmitter<any>(); // Emite un evento al cerrar el diálogo después de crear un usuario

  
  // Datos iniciales del usuario
  updatedUserData = {
    name: '',
    photo: '',
    address: '',
    email: '',
    password: '',
    rolId: 1
  };

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Datos opcionales pasados al abrir el diálogo
  ) {
    // Si se reciben datos, los sobrescribe, pero no es obligatorio
    if (data) {
      this.updatedUserData = {
        ...this.updatedUserData,
        ...data,
        rolId: data?.rol?.id || this.updatedUserData.rolId
      };
    }
  }

  ngOnInit(): void {}

  // Envía los datos del formulario al servicio de autenticación
  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.authService.createUser(this.updatedUserData).subscribe(
        (response) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Usuario creado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.updateUserEvent.emit(true); // Emite que la operación fue exitosa
          this.dialogRef.close(); // Cierra el modal
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear el usuario.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
          });
        }
      );
    } else {
      console.error('El formulario no es válido');
      Swal.fire({
        title: 'Advertencia',
        text: 'Todos los campos son obligatorios.',
        icon: 'warning',
        confirmButtonText: 'Intentar de nuevo'
      })
    }
  }

  // Cierra el modal sin realizar cambios
  closeDialog(): void {
    this.dialogRef.close();
  }
}
