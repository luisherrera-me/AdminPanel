import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  @Output() updateUserEvent = new EventEmitter<any>();  // Emite el usuario actualizado

  updatedUserData = {
    name: '',
    photo: '',
    address: '',
    email: '',
    password: '',
    rolId: 1
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  // Recibe los datos del diálogo
    private authService: AuthService,
    public dialogRef: MatDialogRef<EditUserComponent>
  ) {
    if (data) {
      //console.log("Datos del usuario desde el diálogo:", data);
      this.updatedUserData = { 
        ...data, 
        rolId: data.rol ? data.rol.id : this.updatedUserData.rolId
      };
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.updatedUserData) {
      // Aquí no necesitas crear un objeto nuevo, ya tienes updatedUserData con los datos correctos.
      this.authService.updateUser(this.data.id, this.updatedUserData).subscribe(
        (response) => {
          Swal.fire({
                      title: '¡Éxito!',
                      text: 'Usuario actualizado exitosamente.',
                      icon: 'success',
                      confirmButtonText: 'Aceptar'
                    });
          this.updateUserEvent.emit(response.data == true);  // Emite los datos actualizados del usuario
          this.dialogRef.close();  // Cerrar el modal después de la actualización
        },
        (error) => {
          Swal.fire({
                      title: 'Error',
                      text: 'Hubo un problema al actualizado el usuario.',
                      icon: 'error',
                      confirmButtonText: 'Intentar de nuevo'
                    });
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();  // Cerrar el modal sin hacer cambios
  }
}
