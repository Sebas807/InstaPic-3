import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  formulario!: FormGroup;

  private apiUrl = 'http://localhost:3000/api';
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.-]*$'),Validators.minLength(3),this.validarNombre]],
      email: ['', [Validators.required,Validators.email]],
      fecha: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9.-]*$')]],
      rpassword: ['', [Validators.required]],
    }, {
      validator: this.compararContraseñas('password', 'rpassword')
    });
  }

  get nombre() {
    return this.formulario.get('nombre');
  }

  get email() {
    return this.formulario.get('email');
  }

  get fecha() {
    return this.formulario.get('fecha');
  }

  get password() {
    return this.formulario.get('password');
  }

  get rpassword() {
    return this.formulario.get('rpassword');
  }

  validarNombre(control: AbstractControl): { [key: string]: boolean } | null {
    const nombre = control.value as string;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nombre)) {
      return { 'noEmpiezaConLetra': true };
    }
    return null;
  }

  compararContraseñas(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
        return;
      }
  
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  enviarDatos() {
    const datos = {
      "email": this.email?.value,
      "name": this.nombre?.value,
      "birthday": this.fecha?.value,
      "password": this.password?.value
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post<any>(`${this.apiUrl}/auth`, JSON.stringify(datos), { headers })
    .pipe(
      map((response) => {
        console.log('Respuesta del servidor:', response);
      }),
      catchError((error) => {
        console.error('Error al enviar los datos:', error);
        throw error;
      })
    )
    .subscribe({
      next: () => {
        console.log('Usuario registrado exitosamente');
        this.reiniciarFormulario();
        Swal.fire('Success', 'Register successful', 'success');
        this.router.navigate(['/login']);
      },
      error: () => {
        Swal.fire('Error', 'Register failed: ' , 'error');
      }
    }); 
  }

  reiniciarFormulario() {
    this.formulario.reset();
  }

}
