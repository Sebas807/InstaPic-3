import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  private apiUrl = 'http://localhost:3000/api';

  constructor(private router: Router,
    private http: HttpClient
  ) { 
  }

  cerrarSesion() {  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers);

    this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers }).toPromise()
      .then(() => {
        Swal.fire('Success', 'Logout successful', 'success');
        localStorage.removeItem('token');
        this.router.navigate(['/login']); 
      })
      .catch(error => {
        Swal.fire('Error', 'Logout failed: ' , 'error');
      });
  }

  navigateSearch(){
    this.router.navigate(['/buscar']);
  }
}
