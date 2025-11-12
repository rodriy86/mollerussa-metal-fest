import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HeaderComponent } from '../header-component/header-component';
import { HeroComponent } from '../hero-component/hero-component';
import { NoticiesComponent } from '../noticies-component/noticies-component';
import { LineupComponent } from '../lineup-component/lineup-component';
import { InfoComponent } from '../info-component/info-component';
//import { TiendaComponent } from '../tienda-component/tienda-component';
//import { MapaRecinto } from '../mapaRecinto-component/mapa-recinto';
import { UbicacionComponent } from '../ubicacion-component/ubicacion';
//import { AdminComponent } from "../admin-component/admin-component";
//import { GaleriaComponent } from '../galeria-component/galeria-component';
//import { FooterComponent } from '../footer-component/footer-component';


@Component({
  selector: 'app-inici-component',
  standalone: true,
  imports: [
    CommonModule,
    //HeaderComponent,
    HeroComponent,
    NoticiesComponent,
    LineupComponent,
    InfoComponent,
    //TiendaComponent,
    //MapaRecinto,
    //FooterComponent,
    UbicacionComponent,
    //AdminComponent
],
  templateUrl: './inici-component.html',
  styleUrl: './inici-component.scss'
})
export class IniciComponent { }