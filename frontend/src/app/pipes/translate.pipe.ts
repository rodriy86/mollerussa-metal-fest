import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // ← CLAVE: Esto hace que el pipe se actualice con cada cambio
})
export class TranslatePipe implements PipeTransform {
  private translationService = inject(TranslationService);

  transform(key: string): string {
    // El pipe se ejecutará cada vez que haya cambios en la aplicación
    // gracias a pure: false
    return this.translationService.translate(key);
  }
}