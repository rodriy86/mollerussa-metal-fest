import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ubicacion.html',
  styleUrl: './ubicacion.scss'
})
export class UbicacionComponent {
  
  // URL del mapa del Teatro L'Amistat
  private mapUrlString = "https://www.google.com/maps?q=41.62979,0.89671&z=17&output=embed";
  
  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrlString);
  }
}