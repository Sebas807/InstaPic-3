import { Component } from '@angular/core';
import { PublicacionesService } from '../galeria/services/publicaciones.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  cantidadActual: number = 0;

  constructor(private publicacionesService: PublicacionesService) {}

  ngOnInit() {
    this.publicacionesService.cantidad$.subscribe(cantidad => {
      this.cantidadActual = cantidad;
    });
  }
}
