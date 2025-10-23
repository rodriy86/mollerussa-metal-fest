/*import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-banda-component',
  imports: [],
  templateUrl: './detalle-banda-component.html',
  styleUrl: './detalle-banda-component.scss'
})
export class DetalleBandaComponent {

}*/

import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { configGlobal } from '../configGlobal';


interface Band {
  id: number;
  name: string;
  schedule: string;
  genre: string;
  image: string;
  description: string;        // ← Quita el ?
  country: string;           // ← Quita el ?
  year: number;              // ← Quita el ?
  created_at?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-detalle-banda-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-banda-component.html',
  styleUrl: './detalle-banda-component.scss'
})
export class DetalleBandaComponent implements OnInit {
 bandaId: number = 0;
  band: Band | null = null;
  isLoading: boolean = true;
  error: string = '';
  configGlobal = configGlobal;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bandaId = +params['id'];
      configGlobal.utils.log('Cargando detalle de banda ID:', this.bandaId);
      this.cargarBanda(this.bandaId);
      window.scrollTo(0, 0);
    });
  }

  cargarBanda(id: number) {
    this.isLoading = true;
    this.error = '';
    configGlobal.utils.log("ID banda:", id);

    // Usar la función bandaPorId de configGlobal
    this.http.get<Band>(configGlobal.api.bandaPorId(id)).subscribe({
      next: (band) => {
        configGlobal.utils.log('Detalle de banda cargado:', band);
        this.band = band;
        this.isLoading = false;
        this.cdRef.detectChanges();
        configGlobal.utils.log("Banda seleccionada: ", band);
      },
      error: (error: HttpErrorResponse) => {
        configGlobal.utils.error('Error cargando detalle de banda:', error);

        if (error.status === 0) {
          this.error = '⚠️ No se puede conectar al servidor.';
        } else if (error.status === 404) {
          this.error = '🎸 Esta banda no tiene información detallada disponible.';
        } else {
          this.error = '❌ No se pudo cargar la información de la banda. Inténtalo de nuevo.';
        }

        this.band = null;
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    });
  }
/*
  volverALineup() {
    this.router.navigate(['/lineup']);
  }*/
 volverALineup() {
  console.log('🔍 === DEBUG volverALineup ===');
  
  this.router.navigate(['/']).then(() => {
    console.log('✅ Navegado a inicio');
    
    setTimeout(() => {
      console.log('🔎 Buscando sección Lineup...');
      
      // Buscar por diferentes IDs posibles
      const ids = ['Lineup', 'lineup', 'cartelera', 'Cartelera'];
      let foundElement = null;
      
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          console.log(`✅ Encontrado con id="${id}"`);
          foundElement = element;
          break;
        }
      }
      
      if (foundElement) {
        console.log('🎯 Haciendo scroll...');
        foundElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.error('❌ No se encontró ninguna sección con ids:', ids);
        console.log('📋 Todos los elementos con id en la página:');
        document.querySelectorAll('[id]').forEach(el => {
          console.log(`- ${el.id}`);
        });
      }
    }, 500);
  });
}

  volverAInicio() {
    this.router.navigate(['/']);
  }

  compartirBanda() {
    if (navigator.share) {
      navigator.share({
        title: this.band?.name,
        text: `Descubre ${this.band?.name} en el Mollerussa Metal Fest`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  }

  recargarBanda() {
    this.cargarBanda(this.bandaId);
  }

  getCountryIcon(country?: string): string {
    if (!country) return 'ri-earth-line';
    
    const icons: { [key: string]: string } = {
      'Spain': 'ri-spain-flag-line',
      'USA': 'ri-usa-flag-line',
      'UK': 'ri-uk-flag-line',
      'Germany': 'ri-germany-flag-line',
      'España': 'ri-spain-flag-line',
      'Estados Unidos': 'ri-usa-flag-line',
      'Reino Unido': 'ri-uk-flag-line',
      'Alemania': 'ri-germany-flag-line',
    };
    
    return icons[country] || 'ri-earth-line';
  }

  // Método para formatear fecha si necesitas mostrar created_at/updated_at
  formatearFecha(fecha?: string): string {
    if (!fecha) return '';
    return configGlobal.utils.formatearFecha(fecha);
  }
}