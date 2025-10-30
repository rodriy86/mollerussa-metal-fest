// noticies-component.ts - CON MÁS DEBUG
import { Component, OnInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { configGlobal } from '../configGlobal';
import { TranslatePipe } from '../pipes/translate.pipe';
import { TranslationService } from '../services/translation.service';

interface Noticia {
  id: number;
  fecha: string;
  categoria: string;
  colorCategoria: string;
  titulo: string;
  resumenNoticia: string;
  detalleNoticia: boolean;
  imagen: string;
  alt: string;
  enlace: string;
  textoEnlace: string;
}

@Component({
  selector: 'app-noticies',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './noticies-component.html',
  styleUrl: './noticies-component.scss'
})
export class NoticiesComponent implements OnInit, OnDestroy {
  private translationService = inject(TranslationService);
  private http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef);
  private languageSubscription?: Subscription;

  noticias: Noticia[] = [];
  isLoading: boolean = true;
  error: string = '';
  configGlobal = configGlobal;
  currentLanguage: string = 'es'; // ✅ Añadir para debug

  ngOnInit(): void {
    console.log('🚀 [NOTICIAS] Componente inicializado');
    this.currentLanguage = this.translationService.getCurrentLang();
    console.log('🌐 [NOTICIAS] Idioma inicial:', this.currentLanguage);
    
    this.loadNoticias();
    
    // ✅ SUSCRIPCIÓN A CAMBIOS DE IDIOMA CON MÁS DEBUG
    this.languageSubscription = this.translationService.currentLang$.subscribe(
      (newLang) => {
        console.log('🎯 [NOTICIAS] SUSCRIPCIÓN ACTIVADA - Idioma cambiado a:', newLang);
        console.log('🔄 [NOTICIAS] Idioma anterior:', this.currentLanguage, 'Nuevo:', newLang);
        
        this.currentLanguage = newLang;
        this.loadNoticias(); // Recargar noticias con nuevo idioma
      },
      (error) => {
        console.error('❌ [NOTICIAS] Error en suscripción:', error);
      },
      () => {
        console.log('📴 [NOTICIAS] Suscripción completada');
      }
    );
    
    console.log('✅ [NOTICIAS] Suscripción configurada');
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      console.log('🧹 [NOTICIAS] Limpiando suscripción');
      this.languageSubscription.unsubscribe();
    }
  }

  loadNoticias(): void {
    this.isLoading = true;
    this.error = '';

    const currentLang = this.translationService.getCurrentLang();
    console.log('📡 [NOTICIAS] Cargando noticias para idioma:', currentLang);
    
    // ✅ USAR PARÁMETROS CON EL BACKEND QUE AHORA SÍ FUNCIONA
    const params = new HttpParams().set('lang', currentLang);
    const url = `${configGlobal.api.noticias}?lang=${currentLang}`;
    
    console.log('🔗 [NOTICIAS] URL completa:', url);

    this.http.get<Noticia[]>(configGlobal.api.noticias, { params }).subscribe({
      next: (noticias) => {
        console.log('✅ [NOTICIAS] Noticias cargadas:', noticias.length, 'en idioma:', currentLang);
        console.log('📊 [NOTICIAS] Primera noticia:', noticias[0]?.titulo);
        
        this.noticias = noticias;
        this.isLoading = false;
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('❌ [NOTICIAS] Error cargando noticias:', error);
        console.error('🔍 [NOTICIAS] URL que falló:', error.url);
        
        // ✅ Intentar sin parámetro si falla
        if (error.status === 404) {
          console.log('🔄 [NOTICIAS] Intentando cargar sin parámetro lang...');
          this.loadNoticiasWithoutLang();
        } else {
          this.error = this.translationService.translate('NOTICIAS.ERROR_CARGAR') || 'En este momento no podemos mostrar las noticias';
          this.noticias = [];
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      }
    });
  }

  private loadNoticiasWithoutLang(): void {
    console.log('🔄 [NOTICIAS] Cargando sin parámetro lang...');
    
    this.http.get<Noticia[]>(configGlobal.api.noticias).subscribe({
      next: (noticias) => {
        console.log('✅ [NOTICIAS] Noticias cargadas (sin lang):', noticias.length);
        this.noticias = noticias;
        this.isLoading = false;
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('❌ [NOTICIAS] Error cargando noticias (sin lang):', error);
        this.error = this.translationService.translate('NOTICIAS.ERROR_CARGAR') || 'En este momento no podemos mostrar las noticias';
        this.noticias = [];
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  // ✅ MÉTODO PARA PROBAR MANUALMENTE
  testLanguageChange(): void {
    console.log('🧪 [TEST] Probando cambio de idioma manual...');
    const testLangs = ['es', 'ca', 'en'];
    
    testLangs.forEach((lang, index) => {
      setTimeout(() => {
        console.log(`🧪 [TEST] Cambiando a idioma: ${lang}`);
        this.translationService.setLanguage(lang);
      }, index * 2000); // Cambiar cada 2 segundos
    });
  }

  reloadNoticias(): void {
    console.log('🔄 [NOTICIAS] Recarga manual');
    this.loadNoticias();
  }

  trackByNoticiaId(index: number, noticia: Noticia): number {
    return noticia.id;
  }
}