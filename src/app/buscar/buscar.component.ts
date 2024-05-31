import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {
  formulario!: FormGroup;
  private apiUrl = 'http://localhost:3000/api';
  email: string = '';
  name: string = '';
  birthday: string= '';
  isSearch: boolean = false;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      busqueda: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.-]*$'),Validators.minLength(3),this.validarNombre]],
    });
  }

  get busqueda() {
    return this.formulario.get('busqueda');
  }

  validarNombre(control: AbstractControl): { [key: string]: boolean } | null {
    const nombre = control.value as string;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nombre)) {
      return { 'noEmpiezaConLetra': true };
    }
    return null;
  }

  async getUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in again.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {
      const userInfo = await this.http.get<any>(`${this.apiUrl}/auth/${this.busqueda?.value}`, { headers }).toPromise();     
      if(userInfo){
        this.email = userInfo.email;
        this.name = userInfo.name;
        this.birthday = userInfo.birthday;
        this.isSearch = true;
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw new Error('Failed to fetch user info');
    }
  }

  Volver() {
    this.isSearch = false;
  }
}
