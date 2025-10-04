/*import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-noticia-component',
  imports: [],
  templateUrl: './detalle-noticia-component.html',
  styleUrl: './detalle-noticia-component.scss'
})
export class DetalleNoticiaComponent {

}
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
  citas: { texto: string; autor: string }[];
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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.noticiaId = +params['id'];
      this.cargarNoticia(this.noticiaId);
    });
  }

  cargarNoticia(id: number) {
    // En una app real, esto vendría de una API
    const noticiasCompletas: { [key: number]: NoticiaCompleta } = {
      1: {
        id: 1,
        fecha: '15 Enero 2025',
        categoria: 'LINEUP',
        titulo: '¡Confirmado! Cor Rebel se suma al lineup 2026',
        descripcionCorta: 'La legendaria banda de black metal finlandesa actuará el sábado 16 de julio en el escenario principal del Mollerussa Metal Fest 2025.',
        contenido: [
          'El Mollerussa Metal Fest 2025 sigue sumando grandes nombres a su cartel y hoy tenemos el placer de anunciar oficialmente la confirmación de Cor Rebel, una de las bandas más respetadas y temidas del black metal Catalan.',
          'La formación de Helsinki actuará el sábado 16 de julio a las 21:30h en el escenario principal, ofreciendo una actuación que promete ser uno de los momentos más intensos e inolvidables del festival.',
          'Tras meses de negociaciones y expectación por parte de los fans, finalmente podemos confirmar que Cor Rebel pisará La Amistat.',
          'La banda, ha sido durante décadas una de las referencias indiscutibles de Lleida.'
        ],
        imagenPrincipal: 'https://readdy.ai/api/search-image?query=epic%20black%20metal%20band%20Infernal%20Shadows%20performing%20on%20massive%20stage%20with%20dramatic%20red%20and%20blue%20lighting%2C%20smoke%20effects%2C%20corpse%20paint%20face%20makeup%2C%20long%20hair%20musicians%2C%20electric%20guitars%2C%20dark%20atmospheric%20concert%20venue%2C%20Finnish%20black%20metal%20aesthetic%2C%20professional%20concert%20photography%2C%20intense%20performance%20energy%2C%20metal%20festival%20stage%20setup&width=1920&height=1080&seq=infernal001&orientation=landscape',
        autor: 'Redacción MMF',
        tiempoLectura: '8 min',
        visualizaciones: '2.847',
        imagenes: [
          'https://readdy.ai/api/search-image?query=Finnish%20black%20metal%20band%20Infernal%20Shadows%20promotional%20photo%2C%20five%20members%20with%20corpse%20paint%20makeup%2C%20long%20black%20hair%2C%20dark%20clothing%2C%20forest%20background%2C%20atmospheric%20black%20metal%20aesthetic%2C%20professional%20band%20photography%2C%20Nordic%20winter%20atmosphere%2C%20dramatic%20lighting&width=600&height=400&seq=band_photo001&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Infernal%20Shadows%20live%20concert%20performance%2C%20black%20metal%20band%20on%20stage%2C%20dramatic%20stage%20lighting%2C%20corpse%20paint%20face%20makeup%2C%20electric%20guitars%2C%20concert%20photography%2C%20atmospheric%20performance%2C%20Finnish%20black%20metal%20live%20show&width=400&height=300&seq=live001&orientation=landscape'
        ],
        citas: [
          {
            texto: 'Estamos absolutamente emocionados de traer nuestra música a España por primera vez. El Mollerussa Metal Fest tiene una reputación excelente y sabemos que el público español entiende y respeta el black metal auténtico. Será una noche que nadie olvidará.',
            autor: 'Varg Shadowmere, vocalista de Infernal Shadows'
          }
        ]
      }
      // Puedes añadir más noticias aquí...
    };

    this.noticia = noticiasCompletas[id] || null;
  }

  volverANoticias() {
    this.router.navigate(['/noticias']);
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
}