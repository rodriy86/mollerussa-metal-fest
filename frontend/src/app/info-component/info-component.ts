//import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-component.html',
  styleUrl: './info-component.html',
})
export class InfoComponent {
  buyTicket(type: string, price: number) {
    // Aquí tu lógica para comprar entradas
    console.log(`Comprando entrada ${type} por ${price}€`);
    // Por ejemplo: window.open('https://entradium.com/mmf2026', '_blank');
  }
}