import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { configGlobal } from '../configGlobal';
import { TranslationService } from '../services/translation.service';


interface NoticiaCompleta {
  id: number;
  fecha: string;
  categoria: string;
  titulo: string;
  descripcionCorta: string;
  contenido: string[];
  imagenPrincipal: string;
  autor: string;
  tiempoLectura: string;
  visualizaciones: string;
  imagenes: string[];
  videos?: string[];
  boton: boolean;
  textoBoton: string;
}

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-noticia-component.html',
  styleUrl: './detalle-noticia-component.scss'
})
export class DetalleNoticiaComponent implements OnInit {
  noticiaId: number = 0;
  noticia: NoticiaCompleta | null = null;
  isLoading: boolean = true;
  error: string = '';
  configGlobal = configGlobal;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef);
  private translationService = inject(TranslationService); // INYECTAR EL SERVICIO

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.noticiaId = +params['id'];
      console.log('🔄 Cargando detalle de noticia ID:', this.noticiaId);
      
      // OBTENER IDIOMA ACTUAL DEL SERVICIO DE TRADUCCIÓN
      const currentLang = this.translationService.getCurrentLang();
      console.log('🌐 Idioma actual desde TranslationService:', currentLang);
      
      this.cargarNoticia(this.noticiaId, currentLang);
      window.scrollTo(0, 0);
    });
  }

  navigateToComidaSolidaria() {
    this.router.navigate(['/comida-solidaria']);
  }

  cargarNoticia(id: number, lang: string) {
    this.isLoading = true;
    this.error = '';
    console.log("id noticia:", id);
    console.log("idioma:", lang);

    // ✅ ENVIAR PARÁMETRO DE IDIOMA COMO EN NOTICIASCOMPONENT
    const params = new HttpParams().set('lang', lang);
    const url = `${configGlobal.api.detalleNoticia(id)}?lang=${lang}`;
    
    console.log('📡 URL detalle noticia:', url);

    this.http.get<NoticiaCompleta>(configGlobal.api.detalleNoticia(id), { params }).subscribe({
      next: (noticia) => {
        console.log('✅ Detalle de noticia cargado:', noticia);
        console.log('🔤 Título recibido:', noticia.titulo);
        console.log('🗓️ Fecha recibida:', noticia.fecha);
        this.noticia = noticia;
        this.isLoading = false;
        this.cdRef.detectChanges();
        console.log("noticia seleccionada: ", noticia);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Error cargando detalle de noticia:', error);
        console.error('🔍 URL que falló:', error.url);

        if (error.status === 0) {
          this.error = '⚠️ No se puede conectar al servidor.';
        } else if (error.status === 404) {
          this.error = '📄 Esta noticia no tiene contenido detallado disponible.';
        } else {
          this.error = '❌ No se pudo cargar la noticia. Inténtalo de nuevo.';
        }

        this.noticia = null;
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  volverANoticias() {
    this.router.navigate(['/noticias']);
  }

  volverAInicio() {
    this.router.navigate(['/']);
  }

  compartirNoticia() {
    if (navigator.share) {
      navigator.share({
        title: this.noticia?.titulo,
        text: this.noticia?.descripcionCorta,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  }

  recargarNoticia() {
    const currentLang = this.translationService.getCurrentLang();
    this.cargarNoticia(this.noticiaId, currentLang);
  }
}