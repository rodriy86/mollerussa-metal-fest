//import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { configGlobal } from '../configGlobal';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-component.html',
  styleUrl: './info-component.html',
})
export class InfoComponent {
  configGlobal = configGlobal;

  buyTicket(type: string, price: number) {
    console.log(`Comprando entrada ${type} por ${price}€`);
  }
}