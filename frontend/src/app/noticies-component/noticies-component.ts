import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { configGlobal } from '../configGlobal';

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
  configGlobal=configGlobal;

  private http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    //console.log('🔄 Iniciando carga de noticias...');
    this.loadNoticias();
  }

  loadNoticias(): void {
    this.isLoading = true;
    this.error = '';
    

    //detectar automaticament l'entorn
    /*const isDevelopment = window.location.hostname === 'localhost' && window.location.port === '4200';
    const baseUrl = isDevelopment ? 'http://localhost:3000' : '';
    const apiUrl = `${baseUrl}/api/noticias`;*/

    
    //this.http.get<Noticia[]>(apiUrl).subscribe({
    this.http.get<Noticia[]>(configGlobal.api.noticias).subscribe({

      next: (noticias) => {
        //console.log('✅ Noticias cargadas correctamente:', noticias);
        this.noticias = noticias;
        this.isLoading = false;

        // Forzar detección de cambios
        this.cdRef.detectChanges();
      },
      error: (error) => {
        //console.error('❌ Error cargando noticias:', error);
        this.error = 'En este momento no podemos mostrar las noticias';
        this.noticias = [];
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  reloadNoticias(): void {
    this.loadNoticias();
  }
}