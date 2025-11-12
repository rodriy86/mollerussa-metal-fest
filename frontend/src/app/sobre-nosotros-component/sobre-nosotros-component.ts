import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { TranslatePipe } from '../pipes/translate.pipe';
import { configGlobal } from '../configGlobal';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './sobre-nosotros-component.html',
  styleUrl: './sobre-nosotros-component.scss',
})
export class SobreNosotrosComponent implements OnInit {
  // Arrays de datos
  imagenes: any[] = [];
  carteleras: any[] = [];

  // Variables de estado
  imagenActiva: number | null = null;
  carteleraActiva: number | null = null;
  isLoading: boolean = true;
  error: string = '';

  private router = inject(Router);
  private http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cargarDatosGaleria();
  }

  cargarDatosGaleria() {
    this.isLoading = true;
    this.error = '';

    // Cargar imágenes desde el backend
    this.http.get<any[]>(configGlobal.api.galeriaImages).subscribe({
      next: (imagenes) => {
        this.imagenes = imagenes;
        this.verificarCargaCompleta();
      },
      error: (error: HttpErrorResponse) => {
        this.manejarError(error, 'imágenes');
      }
    });

    // Cargar carteleras desde el backend
    this.http.get<any[]>(configGlobal.api.galeriaCarteleras).subscribe({
      next: (carteleras) => {
        this.carteleras = carteleras;
        this.verificarCargaCompleta();
      },
      error: (error: HttpErrorResponse) => {
        this.manejarError(error, 'carteleras');
      }
    });
  }

  private verificarCargaCompleta() {
    if ((this.imagenes.length > 0 || this.error) && (this.carteleras.length > 0 || this.error)) {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }
  }

  private manejarError(error: HttpErrorResponse, tipo: string) {
    if (error.status === 0) {
      this.error = '⚠️ No se puede conectar al servidor. Verifica que el backend esté ejecutándose en puerto 3000.';
    } else if (error.status === 404) {
      this.error = `📄 No se encontraron ${tipo} disponibles.`;
    } else {
      this.error = `❌ No se pudieron cargar las ${tipo}. Inténtalo de nuevo.`;
    }
    
    this.verificarCargaCompleta();
  }

  reintentarCarga() {
    this.cargarDatosGaleria();
  }

  get totalEdiciones(): number {
    return this.carteleras.length;
  }

  get totalBandas(): number {
    return this.carteleras.reduce((total, cartelera) => total + cartelera.bandas, 0);
  }

  get totalAsistentes(): string {
    const total = this.carteleras.reduce((total, cartelera) => {
      return total + cartelera.asistencia;
    }, 0);
    return total.toLocaleString();
  }

  get totalPaises(): number {
    return 15;
  }

  abrirImagen(index: number): void {
    this.imagenActiva = index;
    this.carteleraActiva = null;
  }

  cerrarImagen(): void {
    this.imagenActiva = null;
  }

  imagenSiguiente(): void {
    if (this.imagenActiva !== null) {
      this.imagenActiva = (this.imagenActiva + 1) % this.imagenes.length;
    }
  }

  imagenAnterior(): void {
    if (this.imagenActiva !== null) {
      this.imagenActiva = (this.imagenActiva - 1 + this.imagenes.length) % this.imagenes.length;
    }
  }

  abrirCartelera(index: number): void {
    this.carteleraActiva = index;
    this.imagenActiva = null;
  }

  cerrarCartelera(): void {
    this.carteleraActiva = null;
  }

  carteleraSiguiente(): void {
    if (this.carteleraActiva !== null) {
      this.carteleraActiva = (this.carteleraActiva + 1) % this.carteleras.length;
    }
  }

  carteleraAnterior(): void {
    if (this.carteleraActiva !== null) {
      this.carteleraActiva = (this.carteleraActiva - 1 + this.carteleras.length) % this.carteleras.length;
    }
  }

  getColorClass(color: string): string {
    const colorClasses: { [key: string]: string } = {
      'red': 'bg-red-600',
      'blue': 'bg-blue-600',
      'green': 'bg-green-600',
      'yellow': 'bg-yellow-600',
      'purple': 'bg-purple-600',
      'orange': 'bg-orange-600',
      'silver': 'bg-gray-400'
    };
    return colorClasses[color] || 'bg-gray-600';
  }

  volverAInicio(): void {
    this.router.navigate(['/']);
  }
}