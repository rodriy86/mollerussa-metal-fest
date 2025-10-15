import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-galeria-component.html',
  styleUrl: './detalle-galeria-component.html',
})
export class DetalleGaleriaComponent {
  // Textos dinámicos
  festivalNombre = 'Mollerussa Metal Fest';
  logoUrl = 'assets/icons/mask.png';
  textoVolver = 'Volver al inicio';
  tituloGaleria = 'DETALLE GALERÍA';
  descripcionGaleria = 'Revive los mejores momentos de ediciones anteriores';
  tituloCarteleras = 'CARTELERAS HISTÓRICAS';
  descripcionCarteleras = 'Descubre las alineaciones que hicieron historia en el Mollerussa Metal Fest';
  tituloEstadisticas = 'EVOLUCIÓN DEL FESTIVAL';
  textoEdiciones = 'Ediciones';
  textoBandas = 'Bandas totales';
  textoAsistentes = 'Asistentes totales';
  textoPaises = 'Países representados';
  textoBotonVolver = 'Volver al inicio';

  // Arrays de datos
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
      url: 'assets/images/siroll.png',
      alt: ''
    },
    {
      url: 'assets/images/bn.png',
      alt: ''
    },
    {
      url: 'assets/images/trio.png',
      alt: ''
    },
    {
      url: 'assets/images/bn2.png',
      alt: ''
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
      bandas: 8,
      alt: ''
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
      alt: ''
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
      alt: ''
      //dias: 1
    }
  ];

  // Variables de estado
  imagenActiva: number | null = null;
  carteleraActiva: number | null = null;

  // Getters para estadísticas
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
    return 15; // Puedes calcular esto dinámicamente
  }

  constructor(private router: Router) {}

  // Métodos para la galería de imágenes
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

  // Métodos para las carteleras
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

  // Método para obtener clases de color dinámicas
  getColorClass(color: string): string {
    const colorClasses: { [key: string]: string } = {
      'red': 'bg-red-600',
      'blue': 'bg-blue-600',
      'green': 'bg-green-600',
      'yellow': 'bg-yellow-600',
      'purple': 'bg-purple-600',
      'orange': 'bg-orange-600'
    };
    return colorClasses[color] || 'bg-gray-600';
  }

  // Método para volver al inicio
  volverAInicio(): void {
    this.router.navigate(['/']);
  }
}