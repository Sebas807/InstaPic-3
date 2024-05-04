import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionesService } from '../galeria/services/publicaciones.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  showButton = true;

  constructor(private router: Router, 
    private publicacionesService: PublicacionesService) { }

  navigateToGaleria() {
    this.showButton = false;
    this.router.navigate(['galeria']);
  }

  navigateToFeed() {
    this.showButton = true;
    this.router.navigate(['']);
    this.publicacionesService.setCantidad(0);
  }
}
