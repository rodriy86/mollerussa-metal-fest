import { RouterModule } from '@angular/router';
import { configGlobal } from '../configGlobal';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { TranslatePipe } from '../pipes/translate.pipe';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit {
  private translationService = inject(TranslationService);
  configGlobal = configGlobal;

  isMenuOpen = false;
  isLanguageDropdownOpen = false;
  
  // USA MINÚSCULAS para coincidir con los archivos JSON
  currentLanguage: Language = { code: 'es', name: 'Español', flag: 'fi fi-es fis' };
  
  availableLanguages: Language[] = [
    { code: 'es', name: 'Español', flag: 'fi fi-es fis' },
    { code: 'ca', name: 'Català', flag: 'catalan-flag' },
    { code: 'en', name: 'English', flag: 'fi fi-gb fis' }
  ];

  ngOnInit() {
    console.log('HeaderComponent initialized');
    
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const lang = JSON.parse(savedLanguage);
      console.log('Loaded saved language:', lang);
      this.currentLanguage = lang;
      this.translationService.setLanguage(lang.code);
    } else {
      console.log('No saved language, using default:', this.currentLanguage.code);
      this.translationService.setLanguage(this.currentLanguage.code);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isLanguageDropdownOpen = false;
    }
  }

  toggleLanguageDropdown(): void {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  selectLanguage(language: Language): void {
    console.log('Language selected:', language);
    
    this.currentLanguage = language;
    this.isLanguageDropdownOpen = false;
    
    // Guardar en localStorage
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
    
    // Llamar al servicio de traducción
    this.onLanguageChange(language);
    
    console.log('Idioma cambiado a:', language.name);
  }

  private onLanguageChange(language: Language): void {
    console.log('Changing language to:', language.code);
    this.translationService.setLanguage(language.code);
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    
    if (!target.closest('.relative')) {
      this.isLanguageDropdownOpen = false;
    }
    
    if (window.innerWidth < 768 && 
        !target.closest('nav') && 
        !target.closest('button') && 
        this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (window.innerWidth >= 768) {
      this.isMenuOpen = false;
    }
  }
}