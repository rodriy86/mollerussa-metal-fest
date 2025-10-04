import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header-component/header-component';
import { FooterComponent } from './footer-component/footer-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.html'
})
export class App {
  // Puedes dejar esto vacío o añadir lógica si necesitas
}