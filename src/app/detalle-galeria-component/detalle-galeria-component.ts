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

  isMenuOpen = false;

  volverAInicio() {
    this.router.navigate(['/Inicio']);
  }
  
  imagenActiva: number | null = null;

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
    },
    {
      url: 'assets/images/foto7.jpg',
      alt: 'random'
    },
    {
      url: 'assets/images/foto8.jpg',
      alt: 'random'
    }
  ];

  // Nueva propiedad para las carteleras históricas
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
    }
  ];

  // Propiedades calculadas para las estadísticas
  get totalEdiciones(): number {
    return this.carteleras.length;
  }

  get totalBandas(): number {
    return this.carteleras.reduce((total, cartelera) => total + cartelera.bandas, 0);
  }

  get totalAsistentes(): number {
    return this.carteleras.reduce((total, cartelera) => total + cartelera.asistencia, 0);
  }

  get totalPaises(): number {
    return 3;
  }

  abrirImagen(index: number) {
    this.imagenActiva = index;
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