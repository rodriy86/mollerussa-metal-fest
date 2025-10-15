import { Component } from '@angular/core';
import { configGlobal } from '../configGlobal';

@Component({
  selector: 'app-mapa-recinto',
  imports: [],
  templateUrl: './mapa-recinto.html',
  styleUrl: './mapa-recinto.scss'
})
export class MapaRecinto {
  configGlobal=configGlobal;

}