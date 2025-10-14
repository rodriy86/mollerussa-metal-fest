// lineup-component.ts - CON CHANGE DETECTION
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Band {
  id: number;
  name: string;
  schedule: string;
  genre: string;
  image: string;
  description?: string;
  country?: string;
  year?: number;
}

@Component({
  selector: 'app-lineup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lineup-component.html',
  styleUrl: './lineup-component.html'
})
export class LineupComponent implements OnInit {
  
  bands: Band[] = [];
  isLoading: boolean = true;
  error: string = '';

  private http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef); // ← AÑADIR ESTO para detectar em que componente esta al ahcer scroll

  ngOnInit(): void {
    console.log('🔄 Iniciando carga de bandas...');
    this.loadBands();
  }

  loadBands(): void {
    this.isLoading = true;
    this.error = '';

    this.http.get<Band[]>('http://localhost:3000/api/bands').subscribe({
      next: (bands) => {
        console.log('✅ Bandas cargadas correctamente:', bands);
        this.bands = bands;
        this.isLoading = false;
        
        // FORZAR DETECCIÓN DE CAMBIOS
        this.cdRef.detectChanges(); //<- esta linea es calbe para la detecion del componente que visualiza el usuario al hacer scroll
        console.log('🎯 Change detection forzado');
      },
      error: (error) => {
        console.error('❌ Error HTTP:', error);

        // Mensajes específicos según el tipo de error
        if (error.status === 0) {
          this.error = '⚠️ Problemas con el servidor. No se puede conectar al backend.';
        } else if (error.status === 404) {
          this.error = '📰 La información solicitada no existe o no está disponible (404).';
        } else if (error.status >= 500) {
          this.error = '🔧 Error del servidor. Por favor, inténtalo más tarde (500).';
        } else {
          this.error = '❌ No se pudo cargar la información. Inténtalo de nuevo.';
        }

        this.bands = [];
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  reloadBands(): void {
    this.loadBands();
  }
}