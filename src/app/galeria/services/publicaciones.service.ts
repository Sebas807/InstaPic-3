import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private cantidadSubject = new BehaviorSubject<number>(0);
  cantidad$: Observable<number> = this.cantidadSubject.asObservable();

  aumentarCantidad() {
    const cantidadActual = this.cantidadSubject.value;
    this.cantidadSubject.next(cantidadActual + 1);
  }

  setCantidad(nuevaCantidad: number) {
    this.cantidadSubject.next(nuevaCantidad);
  }
}
