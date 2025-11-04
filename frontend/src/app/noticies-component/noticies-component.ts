// noticies-component.ts - VERSIÓN SIMPLIFICADA
import { Component, OnInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
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

  ngOnInit(): void {
    this.loadNoticias();
    
    this.languageSubscription = this.translationService.currentLang$.subscribe(() => {
      this.loadNoticias();
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  loadNoticias(): void {
    this.isLoading = true;
    this.error = '';

    const currentLang = this.translationService.getCurrentLang();
    const params = new HttpParams().set('lang', currentLang);

    this.http.get<Noticia[]>(configGlobal.api.noticias, { params }).subscribe({
      next: (noticias) => {
        this.noticias = noticias;
        this.isLoading = false;
        this.cdRef.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.error = this.translationService.translate('ERRORES.CONEXION') || 'No se puede conectar al servidor';
        } else if (error.status === 404) {
          this.error = this.translationService.translate('ERRORES.NO_ENCONTRADO') || 'No se encontraron noticias';
        } else {
          this.error = this.translationService.translate('ERRORES.GENERICO') || 'Error al cargar las noticias';
        }

        this.noticias = [];
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  reloadNoticias(): void {
    this.loadNoticias();
  }

  trackByNoticiaId(index: number, noticia: Noticia): number {
    return noticia.id;
  }
}