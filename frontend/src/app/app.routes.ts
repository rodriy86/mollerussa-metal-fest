/*import { Routes } from '@angular/router';
import { IniciComponent } from './inici-component/inici-component';
import { LineupComponent } from './lineup-component/lineup-component';
import { InfoComponent } from './info-component/info-component';
import { TiendaComponent } from './tienda-component/tienda-component';

export const routes: Routes = [
  { path: '', component: IniciComponent },
  { path: 'lineup', component: LineupComponent },
  { path: 'info', component: InfoComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: '**', redirectTo: '' }
];*/
import { Routes } from '@angular/router';
import { IniciComponent } from './inici-component/inici-component';
import { DetalleNoticiaComponent } from './detalle-noticia-component/detalle-noticia-component'
import { DetalleGaleriaComponent } from './detalle-galeria-component/detalle-galeria-component';
import { FormAcreditacioComponent } from './form-acreditacio-component/form-acreditacio-component';


export const routes: Routes = [
  { path: '', component: IniciComponent },
  { path: 'noticia/:id', component: DetalleNoticiaComponent },
  { path: 'detalle-galeria', component: DetalleGaleriaComponent },
  { path: 'form-acreditacio', component: FormAcreditacioComponent },
  { path: '**', redirectTo: '' }
  
];