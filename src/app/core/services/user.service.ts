import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  currentUser = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);  // Actualiza el usuario
  }

  getUser() {
    return this.userSubject.getValue();  // Obtiene el usuario actual
  }
}