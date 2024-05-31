import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../galeria/services/publicaciones.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  cantidadActual: number = 0;
  private apiUrl = 'http://localhost:3000/api';
  email: string = '';
  name: string = '';
  birthday: string= '';
  isEditing: boolean = false;

  constructor(private publicacionesService: PublicacionesService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.publicacionesService.cantidad$.subscribe(cantidad => {
      this.cantidadActual = cantidad;
    });
    this.getUserInfo();
  }

  async getUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in again.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {
      const userInfo = await this.http.get<{ email: string, name: string, birthday: string }>(`${this.apiUrl}/auth`, { headers }).toPromise();
      if(userInfo){
        this.email = userInfo.email;
        this.name = userInfo.name;
        this.birthday = userInfo.birthday;
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw new Error('Failed to fetch user info');
    }
  }

  navigateEdit() {
    this.router.navigate(['editprofile']);
   }

  enableEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.getUserInfo(); 
  }

  async saveUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in again.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {
      const updatedInfo = { email: this.email, name: this.name, birthday: this.birthday };
      const updatedUser = await this.http.put<{ email: string, name: string, birthday: string }>(`${this.apiUrl}/auth`, updatedInfo, { headers }).toPromise();
      if (updatedUser){
        this.email = updatedUser.email;
        this.name = updatedUser.name;
        this.birthday = updatedUser.birthday;
        this.isEditing = false;
      }
      Swal.fire('Success', 'User information updated successfully', 'success');
    } catch (error) {
      console.error('Error updating user info:', error);
      throw new Error('Failed to update user info');
    }
  }
}
