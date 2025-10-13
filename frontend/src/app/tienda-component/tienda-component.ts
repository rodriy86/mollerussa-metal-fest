import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tienda-component.html',
  styleUrl: './tienda-component.scss'
})
export class TiendaComponent {
  addToCart(productName: string) {
    alert(`${productName} añadido al carrito`);
    // Aquí puedes agregar la lógica real del carrito
  }
}
