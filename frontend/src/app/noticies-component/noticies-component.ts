import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Noticia {
  id: number;
  fecha: string;
  categoria: string;
  colorCategoria: string;
  titulo: string;
  resumenNoticia: string;
  detalleNoticia: boolean;
  imagen: string;
  alt: string;
  enlace: string;
  textoEnlace: string;
}

@Component({
  selector: 'app-noticies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticies-component.html',
  styleUrl: './noticies-component.scss'
})
export class NoticiesComponent implements OnInit {
  
  noticias: Noticia[] = [];
  isLoading: boolean = true;
  error: string = '';

  private http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('🔄 Iniciando carga de noticias...');
    this.loadNoticias();
  }

  loadNoticias(): void {
    this.isLoading = true;
    this.error = '';

    //this.http.get<Noticia[]>('http://localhost:3000/api/noticias').subscribe({ ok
      this.http.get<Noticia[]>('/api/noticias').subscribe({
      next: (noticias) => {
        console.log('✅ Noticias cargadas correctamente:', noticias);
        this.noticias = noticias;
        this.isLoading = false;
        
        // Forzar detección de cambios
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error cargando noticias:', error);
        this.error = 'En este momento no podemos mostrar las noticias';
        this.noticias = []; // Vaciar array
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  reloadNoticias(): void {
    this.loadNoticias();
  }
}