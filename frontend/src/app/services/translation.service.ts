import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Translation {
  [key: string]: string | Translation;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private http = inject(HttpClient);

  private currentLang = signal<string>('es');
  private translations = signal<{ [lang: string]: Translation }>({});

  currentTranslations = computed(() => {
    const lang = this.currentLang();
    const allTranslations = this.translations();
    return allTranslations[lang] || {};
  });

  setLanguage(lang: string): void {
    this.currentLang.set(lang);
    this.loadTranslations(lang);
  }

  getCurrentLang(): string {
    return this.currentLang();
  }

  loadTranslations(lang: string): void {
    if (this.translations()[lang]) {
      return;
    }

    this.http.get<Translation>(`/assets/i18n/${lang}.json`).subscribe({
      next: (translation) => {
        this.translations.update(translations => ({
          ...translations,
          [lang]: translation
        }));
      },
      error: (error) => {
        console.error(`Error loading ${lang} translations:`, error);
      }
    });
  }

  // Método para manejar objetos anidados como "HEADER.INICIO"
  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.currentTranslations();

    // Navegar a través del objeto anidado
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Si no encuentra la traducción, devuelve la última parte de la clave
        return keys[keys.length - 1];
      }
    }

    return typeof value === 'string' ? value : key;
  }
}