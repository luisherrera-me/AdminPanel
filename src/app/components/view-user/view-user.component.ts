import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-user',
  imports: [CommonModule],
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  @Output() updateUserEvent = new EventEmitter<any>();

  // Datos del usuario que serán mostrados en la vista
  userData = {
    name: '',
    photo: '',
    address: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    rolId: 1
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  // Recibe los datos del usuario desde el componente padre
    public dialogRef: MatDialogRef<ViewUserComponent>
  ) {
    if (data) {
      this.userData = { 
        ...data, 
        rolId: data.rol ? data.rol.name : this.userData.rolId
      };
    }
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();  // Cerrar el modal sin hacer cambios
  }
}
