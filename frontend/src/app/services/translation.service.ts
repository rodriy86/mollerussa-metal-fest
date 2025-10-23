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
  
  // Señal para forzar actualizaciones
  private updateTrigger = signal(0);

  currentTranslations = computed(() => {
    const lang = this.currentLang();
    const allTranslations = this.translations();
    this.updateTrigger(); // Hacerlo reactivo
    return allTranslations[lang] || {};
  });

  setLanguage(lang: string): void {
    console.log('Setting language to:', lang);
    this.currentLang.set(lang.toLowerCase());
    this.loadTranslations(lang.toLowerCase());
  }

  getCurrentLang(): string {
    return this.currentLang();
  }

  loadTranslations(lang: string): void {
    const langCode = lang.toLowerCase();
    if (this.translations()[langCode]) {
      this.updateTrigger.update(v => v + 1); // Forzar actualización
      return;
    }

    console.log('Loading translations for:', langCode);

    this.http.get<Translation>(`/assets/i18n/${langCode}.json`).subscribe({
      next: (translation) => {
        console.log('Translations loaded for:', langCode, translation);
        this.translations.update(translations => ({
          ...translations,
          [langCode]: translation
        }));
        this.updateTrigger.update(v => v + 1); // Forzar actualización después de cargar
      },
      error: (error) => {
        console.error(`Error loading ${langCode} translations:`, error);
      }
    });
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.currentTranslations();

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn('Translation key not found:', key);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }
}