import { RouterModule } from '@angular/router'; //per canviar de pagina a una altra
import { configGlobal } from '../configGlobal';
import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Language {
  code: string;
  name: string;
  //flag: string;
}

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [CommonModule, RouterModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit {
  configGlobal=configGlobal;

  // Estado del menú móvil
  isMenuOpen = false;
  
  // Estado del dropdown de idiomas
  isLanguageDropdownOpen = false;
  
  // Idioma actual
  currentLanguage: Language = { code: 'ES ', name: 'Español'/*, flag: '🇪🇸' */};
  
  // Lista de idiomas disponibles
  availableLanguages: Language[] = [
    { code: 'ES ', name: 'Español' /*flag: '🇪🇸' */},
    { code: 'CAT', name: 'Catala' /*flag: 'cat' */},
    { code: 'EN ', name: 'English' /*flag: '🇺🇸' */}
  ];

  ngOnInit() {
    // Cargar idioma guardado si existe
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const lang = JSON.parse(savedLanguage);
      this.currentLanguage = lang;
    }
  }

  // Alternar menú móvil
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Cerrar dropdown de idiomas cuando se abre el menú móvil
    if (this.isMenuOpen) {
      this.isLanguageDropdownOpen = false;
    }
  }

  // Alternar dropdown de idiomas
  toggleLanguageDropdown(): void {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  // Seleccionar idioma
  selectLanguage(language: Language): void {
    this.currentLanguage = language;
    this.isLanguageDropdownOpen = false;
    
    // Guardar en localStorage
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
    
    // Emitir evento o llamar servicio de traducción
    this.onLanguageChange(language);
    
    console.log('Idioma cambiado a:', language.name);
  }

  // Manejar cambio de idioma
  private onLanguageChange(language: Language): void {
    // Aquí puedes integrar con tu servicio de traducción
    // Por ejemplo: this.translationService.setLanguage(language.code);
    
    // Recargar la página o actualizar las traducciones
    // window.location.reload(); // Si necesitas recargar la página
  }

  // Scroll a secciones
  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Cerrar menú móvil después de hacer clic
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  // Cerrar dropdowns al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    
    // Cerrar dropdown de idiomas si se hace clic fuera
    if (!target.closest('.relative')) {
      this.isLanguageDropdownOpen = false;
    }
    
    // Cerrar menú móvil si se hace clic fuera (solo en móvil)
    if (window.innerWidth < 768 && 
        !target.closest('nav') && 
        !target.closest('button') && 
        this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  // Cerrar dropdowns al redimensionar la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (window.innerWidth >= 768) {
      this.isMenuOpen = false;
    }
  }

  /*scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }*/
}


