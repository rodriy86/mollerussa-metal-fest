import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../pipes/translate.pipe';
import { AuthService } from '../services/auth.service';
import { configGlobal } from '../configGlobal';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './admin-component.html'
})
export class AdminComponent {
  authService = inject(AuthService);
  configGlobal = configGlobal;

  // Métodos para las acciones del panel
  gestionarUsuarios() {
    console.log('Iniciando gestión de usuarios...');
    // Aquí iría la lógica para gestionar usuarios
  }

  gestionarBandas() {
    console.log('Iniciando gestión de bandas...');
    // Aquí iría la lógica para gestionar bandas
  }

  gestionarConfiguracion() {
    console.log('Iniciando gestión de configuración...');
    // Aquí iría la lógica para gestionar configuración
  }

  exportarDatos() {
    console.log('Exportando datos...');
    // Aquí iría la lógica para exportar datos
  }
}