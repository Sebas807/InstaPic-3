import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  private apiUrl = 'http://localhost:3000/api';

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9.-]*$')]],
    });
  }

  get email() {
    return this.formulario.get('email');
  }

  get password() {
    return this.formulario.get('password');
  }

  async enviarDatos() {
    const loginDto = { email: this.email?.value, password: this.password?.value };
    try {
      const response = await this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, loginDto).toPromise();
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        Swal.fire('Success', 'Login successful', 'success');
        this.router.navigate(['/home']); 
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire('Error', 'Login failed: ' , 'error');
    }
  }

  reiniciarFormulario() {
    this.formulario.reset();
  }
 
  navegarRegistro() {
   this.router.navigate(['/registro']);
  }

}
