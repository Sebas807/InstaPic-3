import { Component } from '@angular/core';
import { Photo } from './interfaces/galeria.interface';
import { PublicacionesService } from './services/publicaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})

export class GaleriaComponent {
  photos: Photo[] = [];
  showFileInput = true;
  files: File | null = null;
  photoId = 0;
  photoIdString = '';
  altText = 'Imagen no encontrada'

  constructor(private publicacionesService: PublicacionesService,
    private router: Router
  ) { }

  saveImages(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (!inputElement.files || inputElement.files.length === 0) {
      return;
    }

    this.files = inputElement.files[0];
    this.showFileInput = false;
  }

  uploadImages() {
    if (this.files) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const photoId = (++this.photoId).toString();
        const photo: Photo = { id: photoId, file: this.files as File, url: imageUrl };
        this.photos.push(photo);
      };
      reader.readAsDataURL(this.files);
      this.showFileInput = true;
      this.publicacionesService.aumentarCantidad();
    }
    else{
      return;
    }
  }

  Volver() {
    this.router.navigate(['/home']);
  }
}
