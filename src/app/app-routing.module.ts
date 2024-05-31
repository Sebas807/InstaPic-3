import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './galeria/galeria.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ProfileComponent } from './profile/profile.component';
import { BuscarComponent } from './buscar/buscar.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
