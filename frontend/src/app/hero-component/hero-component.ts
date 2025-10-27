import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { configGlobal } from '../configGlobal';
import { TranslationService } from '../services/translation.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe], // Añade TranslatePipe aquí
  templateUrl: './hero-component.html',
  styleUrl: './hero-component.scss'
})
export class HeroComponent {
  private translationService = inject(TranslationService); // Inyecta el servicio
  configGlobal = configGlobal;

  constructor(private router: Router) { }

  getFormattedDate(): string {
    const lang = this.translationService.getCurrentLang();

    // Solo usar la fecha de inicio (más simple y evita errores)
    const startDate = new Date(this.configGlobal.festival.fechaInicio);

    // Opciones para mostrar en formato "15 Julio 2024"
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return startDate.toLocaleDateString(lang, options);
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateToComidaSolidaria() {
    this.router.navigate(['/comida-solidaria']);
  }
}