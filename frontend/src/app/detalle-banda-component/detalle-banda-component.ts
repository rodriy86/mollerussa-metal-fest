import { Component, OnInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { configGlobal } from '../configGlobal';
import { TranslationService } from '../services/translation.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { Subscription } from 'rxjs';

interface Band {
  id: number;
  name: string;
  schedule: string;
  genre: string;
  image: string;
  description: string;
  autor: string;
  spotify: string;
  country: string;
  year: number;
  created_at?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-detalle-banda-component',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './detalle-banda-component.html',
  styleUrl: './detalle-banda-component.scss'
})
export class DetalleBandaComponent implements OnInit, OnDestroy {
  bandaId: number = 0;
  band: Band | null = null;
  isLoading: boolean = true;
  error: string = '';
  configGlobal = configGlobal;

  private langSubscription!: Subscription;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef);
  private translationService = inject(TranslationService); 

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bandaId = +params['id'];
      configGlobal.utils.log('Cargando detalle de banda ID:', this.bandaId);
      
      // Suscribirse a cambios de idioma
      this.langSubscription = this.translationService.currentLang$.subscribe(() => {
        this.cargarBanda(this.bandaId);
      });
      
      this.cargarBanda(this.bandaId);
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  cargarBanda(id: number) {
  this.isLoading = true;
  this.error = '';
  console.log('🎸 [CLIENTE] Cargando banda ID:', id);

  const currentLang = this.translationService.getCurrentLang();
  const params = new HttpParams().set('lang', currentLang);

  // ✅ USAR SOLUCIÓN TEMPORAL - Cargar TODAS las bandas
  this.http.get<Band[]>(configGlobal.api.bands, { params }).subscribe({
    next: (bands) => {
      console.log('✅ [CLIENTE] Bandas cargadas:', bands.length);
      console.log('📋 [CLIENTE] Bandas disponibles:', bands.map(b => ({ id: b.id, name: b.name })));
      
      // Buscar la banda por ID
      const band = bands.find(b => b.id === id);
      
      if (band) {
        console.log('🎸 [CLIENTE] Banda encontrada:', {
          id: band.id,
          name: band.name,
          schedule: band.schedule,
          genre: band.genre,
          country: band.country,
          spotify: band.spotify,
          autor: band.autor
        });
        this.band = band;
        this.isLoading = false;
        this.cdRef.detectChanges();
      } else {
        console.error('❌ [CLIENTE] Banda no encontrada con ID:', id);
        this.error = this.translationService.translate('ERRORES.BANDA_NO_ENCONTRADA') || '🎸 Esta banda no tiene información detallada disponible.';
        this.band = null;
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    },
    error: (error: HttpErrorResponse) => {
      console.error('❌ [CLIENTE] Error cargando bandas:', error);
      console.error('🔗 [CLIENTE] URL que falló:', error.url);

      if (error.status === 0) {
        this.error = this.translationService.translate('ERRORES.CONEXION') || '⚠️ No se puede conectar al servidor.';
      } else if (error.status === 404) {
        this.error = this.translationService.translate('ERRORES.NO_ENCONTRADO') || '📰 No se encontraron bandas.';
      } else {
        this.error = this.translationService.translate('ERRORES.GENERICO') || '❌ No se pudo cargar la información de la banda. Inténtalo de nuevo.';
      }

      this.band = null;
      this.isLoading = false;
      this.cdRef.detectChanges();
    }
  });
}

  volverALineup() {
    console.log('🔍 === DEBUG volverALineup ===');

    this.router.navigate(['/']).then(() => {
      console.log('✅ Navegado a inicio');

      setTimeout(() => {
        console.log('🔎 Buscando sección Lineup...');

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
    if (!country) return 'fi fi-xx';
    
    const flags: { [key: string]: string } = {
      'Spain': 'fi fi-es',
      'España': 'fi fi-es',
      'Espanya': 'fi fi-es',
      'USA': 'fi fi-us',
      'Estados Unidos': 'fi fi-us',
      'UK': 'fi fi-gb', 
      'Reino Unido': 'fi fi-gb',
      'Germany': 'fi fi-de',
      'Alemania': 'fi fi-de',
      'France': 'fi fi-fr',
      'Francia': 'fi fi-fr',
      'Italy': 'fi fi-it',
      'Italia': 'fi fi-it',
    };
    
    return flags[country] || 'fi fi-xx';
  }

  formatearFecha(fecha?: string): string {
    if (!fecha) return '';
    return configGlobal.utils.formatearFecha(fecha);
  }
}