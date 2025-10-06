import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-galeria-component.html',
  styleUrl: './detalle-galeria-component.html',
})
export class DetalleGaleriaComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  volverAInicio() {
    this.router.navigate(['/noticias']);
  }
  
  imagenActiva: number | null = null;
  carteleraActiva: number | null = null;

  imagenes = [
    {
      url: 'assets/images/foto1.jpg',
      alt: 'Público emocionado en el escenario principal'
    },
    {
      url: 'assets/images/foto2.jpg',
      alt: 'Banda tocando con increíble energía'
    },
    {
      url: 'assets/images/foto3.jpg', 
      alt: 'Momento épico del guitarrista principal'
    },
    {
      url: 'assets/images/foto4.jpg',
      alt: 'Vista del escenario con luces espectaculares'
    },
    {
      url: 'assets/images/foto5.jpg',
      alt: 'Fans disfrutando del mejor metal'
    },
    {
      url: 'assets/images/foto6.jpg',
      alt: 'Clímax del concierto con pirotecnia'
    }
  ];

  carteleras = [
    {
      anyo: 2026,
      //titulo: 'Edición Épica',
      headliners: ['Iron Fury', 'Death Realm'],
      asistencia: 550,
      imagen: 'assets/images/cartelera26.jpg',
      color: 'red',
      bandas: 8
      //dias: 2
    },
    {
      anyo: 2025,
      //titulo: 'Aniversario',
      headliners: ['Bellako', 'Indar'],
      asistencia: 250,
      imagen: 'assets/images/cartelera25.jpg',
      color: 'yellow',
      bandas: 5,
      //dias: 1
    },
    {
      anyo: 2024,
      //titulo: 'Aniversario',
      headliners: ['Purin', 'Libervm'],
      asistencia: 180,
      imagen: 'assets/images/cartelera24.png',
      color: 'silver',
      bandas: 5,
      //dias: 1
    }
  ];

  // Propiedades calculadas para las estadísticas
  get totalEdiciones(): number {
    return this.carteleras.length;
  }

  get totalBandas(): number {
    return this.carteleras.reduce((total, cartelera) => total + cartelera.bandas, 0);
  }

  get totalAsistentes(): string {
    return '2,220';
  }

  get totalPaises(): number {
    return 3;
  }

  // Métodos para imágenes de galería
  abrirImagen(index: number) {
    this.imagenActiva = index;
    this.carteleraActiva = null;
    document.body.style.overflow = 'hidden';
  }

  cerrarImagen() {
    this.imagenActiva = null;
    document.body.style.overflow = 'auto';
  }

  imagenSiguiente() {
    if (this.imagenActiva !== null) {
      this.imagenActiva = (this.imagenActiva + 1) % this.imagenes.length;
    }
  }

  imagenAnterior() {
    if (this.imagenActiva !== null) {
      this.imagenActiva = (this.imagenActiva - 1 + this.imagenes.length) % this.imagenes.length;
    }
  }

  // Métodos para carteleras
  abrirCartelera(index: number) {
    this.carteleraActiva = index;
    this.imagenActiva = null;
    document.body.style.overflow = 'hidden';
  }

  cerrarCartelera() {
    this.carteleraActiva = null;
    document.body.style.overflow = 'auto';
  }

  carteleraSiguiente() {
    if (this.carteleraActiva !== null) {
      this.carteleraActiva = (this.carteleraActiva + 1) % this.carteleras.length;
    }
  }

  carteleraAnterior() {
    if (this.carteleraActiva !== null) {
      this.carteleraActiva = (this.carteleraActiva - 1 + this.carteleras.length) % this.carteleras.length;
    }
  }

  // Método para obtener la clase de color dinámicamente
  getColorClass(color: string): string {
    const colorClasses: { [key: string]: string } = {
      'red': 'bg-red-600',
      'yellow': 'bg-yellow-600',
      'purple': 'bg-purple-600',
      'blue': 'bg-blue-600',
      'green': 'bg-green-600'
    };
    return colorClasses[color] || 'bg-gray-600';
  }
}