import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { configGlobal } from '../configGlobal';

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.noticiaId = +params['id'];
      console.log('🔄 Cargando detalle de noticia ID:', this.noticiaId);
      this.cargarNoticia(this.noticiaId);
      window.scrollTo(0, 0);
    });
  }

  navigateToComidaSolidaria() {
    this.router.navigate(['/comida-solidaria']);
  }

  cargarNoticia(id: number) {
    this.isLoading = true;
    this.error = '';
    console.log("id noticia:", id);

    // Cargar desde el backend - SOLO la noticia que el usuario seleccionó
    this.http.get<NoticiaCompleta>(configGlobal.api.detalleNoticia(id)).subscribe({
      next: (noticia) => {
        console.log('✅ Detalle de noticia cargado:', noticia);
        this.noticia = noticia;
        this.isLoading = false;
        this.cdRef.detectChanges();
        console.log("noticia seleccionada: ", noticia);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Error cargando detalle de noticia:', error);

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
    this.cargarNoticia(this.noticiaId);
  }
}