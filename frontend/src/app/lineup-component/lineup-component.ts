// lineup-component.ts - VERSIÓN FINAL SIMPLIFICADA
import { Component, OnInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { configGlobal } from '../configGlobal';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { Subscription } from 'rxjs';

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
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './lineup-component.html',
  styleUrl: './lineup-component.scss'
})
export class LineupComponent implements OnInit, OnDestroy {
  
  bands: Band[] = [];
  isLoading: boolean = true;
  error: string = '';
  configGlobal = configGlobal;

  private langSubscription!: Subscription;
  private http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef);
  private translationService = inject(TranslationService);

  ngOnInit(): void {
    this.langSubscription = this.translationService.currentLang$.subscribe(() => {
      this.loadBands();
    });
    
    this.loadBands();
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  loadBands(): void {
    this.isLoading = true;
    this.error = '';

    const currentLang = this.translationService.getCurrentLang();
    const params = new HttpParams().set('lang', currentLang);
    
    this.http.get<Band[]>(configGlobal.api.bands, { params }).subscribe({
      next: (bands) => {
        this.bands = bands;
        this.isLoading = false;
        this.cdRef.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.error = this.translationService.translate('ERRORES.CONEXION') || '⚠️ No se puede conectar al servidor.';
        } else if (error.status === 404) {
          this.error = this.translationService.translate('ERRORES.NO_ENCONTRADO') || '📰 No se encontraron bandas.';
        } else {
          this.error = this.translationService.translate('ERRORES.GENERICO') || '❌ No se pudieron cargar las bandas. Inténtalo de nuevo.';
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