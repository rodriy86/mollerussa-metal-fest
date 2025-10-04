import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; //per canviar de pagina a una altra

interface Noticia {
  id: number;
  fecha: string;
  categoria: string;
  colorCategoria: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  alt: string;
  enlace: string; //redirigir a una seccio de la web
  textoEnlace: string;
}

@Component({
  selector: 'app-noticies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticies-component.html',
  styleUrl: './noticies-component.scss'
})
export class NoticiesComponent {
  noticias: Noticia[] = [
    {
      id: 1,
      fecha: '15 Enero 2026',
      categoria: 'LINEUP',
      colorCategoria: 'bg-red-600',
      titulo: '¡Confirmado! Cor Rebel se suma a la cartelera 2026',
      descripcion: 'La legendaria banda de black metal finlandesa actuará el sábado 16 de julio en el escenario principal. Una adición épica que promete momentos inolvidables.',
      imagen: 'https://readdy.ai/api/search-image?query=metal%20band%20announcement%20poster%2C%20heavy%20metal%20concert%20announcement%2C%20dark%20dramatic%20design%20with%20red%20lightning%20effects%2C%20professional%20music%20industry%20announcement%2C%20band%20reveal%20poster%20with%20guitars%20and%20stage%20lights&width=400&height=300&seq=news001&orientation=landscape',
      alt: 'Nueva banda confirmada',
      enlace: '#Lineup',
      textoEnlace: 'Ver lineup'
    },
    /*{
      id: 2,
      fecha: '10 Enero 2026',
      categoria: 'TIENDA',
      colorCategoria: 'bg-blue-600',
      titulo: 'Ya disponible el merchandising oficial 2026',
      descripcion: 'Consigue ya las nuevas camisetas, gorras y accesorios oficiales del festival. Diseños exclusivos que no podrás encontrar en ningún otro lugar.',
      imagen: 'https://readdy.ai/api/search-image?query=festival%20merchandise%20collection%2C%20metal%20band%20t-shirts%20and%20accessories%20laid%20out%2C%20official%20festival%20merchandise%20display%2C%20black%20shirts%20with%20red%20designs%2C%20metal%20music%20memorabilia%20collection&width=400&height=300&seq=news002&orientation=landscape',
      alt: 'Merchandising 2026',
      enlace: '#tienda',
      textoEnlace: 'Ver tienda'
    },*/
    {
      id: 2,
      fecha: '10 Enero 2026',
      categoria: 'MERCHANDAISING',
      colorCategoria: 'bg-blue-600',
      titulo: 'Purin confirma!',
      descripcion: 'Purin confirma nuestra cita en el Festival por segunda vez consecutiva! Tendran su stand montado para la venta de merchandaising y mucho mas, aprobecha esta oportunidad para llevar a purin siempre contigo.',
      imagen: 'assets/images/foto8.jpg',
      alt: 'Merchandising 2026',
      enlace: '#Lineup',
      textoEnlace: 'Ver Lineup',
    },
    {
      id: 3,
      fecha: '5 Enero 2026',
      categoria: 'ENTRADAS',
      colorCategoria: 'bg-yellow-600',
      titulo: '¡Últimos días y pocas entradas!',
      descripcion: 'No te pierdas la oportunidad de conseguir tu entrada al mejor precio.',
      imagen: 'https://readdy.ai/api/search-image?query=festival%20early%20bird%20tickets%20promotion%2C%20concert%20ticket%20design%20with%20red%20and%20black%20colors%2C%20metal%20festival%20ticket%20graphics%2C%20promotional%20ticket%20image%20with%20skull%20and%20guitar%20elements&width=400&height=300&seq=news003&orientation=landscape',
      alt: 'Early Bird tickets',
      enlace: '#Entradas',
      textoEnlace: 'Comprar entradas'
    },
    {
      id: 4,
      fecha: '28 Diciembre 2025',
      categoria: 'RECINTO',
      colorCategoria: 'bg-green-600',
      titulo: 'Mejoras en el recinto: nuevo escenario',
      descripcion: 'Este año contaremos con un escenario principal renovado y una zona más amplia con mejores servicios para ofrecer la mejor experiencia posible.',
      imagen: 'https://readdy.ai/api/search-image?query=festival%20venue%20construction%20and%20stage%20setup%2C%20metal%20festival%20site%20preparation%2C%20main%20stage%20construction%20with%20lighting%20rigs%2C%20festival%20grounds%20being%20prepared%2C%20construction%20crew%20working&width=400&height=300&seq=news004&orientation=landscape',
      alt: 'Preparativos festival',
      enlace: '#',
      textoEnlace: ''
    },
    {
      id: 5,
      fecha: '20 Diciembre 2024',
      categoria: 'SOSTENIBILIDAD',
      colorCategoria: 'bg-green-600',
      titulo: 'Mollerussa Metal Fest 2025: Comprometidos con el medio ambiente',
      descripcion: 'Implementamos nuevas medidas ecológicas incluyendo reciclaje, energías renovables y reducción de residuos para un festival más sostenible.',
      imagen: 'https://readdy.ai/api/search-image?query=sustainable%20metal%20festival%2C%20eco-friendly%20concert%20venue%2C%20recycling%20stations%20at%20music%20festival%2C%20green%20initiative%20at%20metal%20concert%2C%20environmental%20awareness%20at%20festival&width=400&height=300&seq=news005&orientation=landscape',
      alt: 'Festival sostenible',
      enlace: '#',
      textoEnlace: ''
    },
    {
      id: 6,
      fecha: '15 Diciembre 2025',
      categoria: 'ESPECIAL',
      colorCategoria: 'bg-purple-600',
      titulo: 'Colaboración épica: Iron Storm y Dark Abyss juntos en el escenario',
      descripcion: 'Por primera vez en la historia del festival, dos de nuestros headliners se unirán para una actuación especial que promete ser histórica.',
      imagen: 'https://readdy.ai/api/search-image?query=metal%20music%20collaboration%20between%20bands%2C%20musicians%20playing%20together%20on%20stage%2C%20collaborative%20metal%20performance%2C%20band%20members%20from%20different%20groups%20performing%2C%20musical%20collaboration%20scene&width=400&height=300&seq=news006&orientation=landscape',
      alt: 'Colaboración especial',
      enlace: '#lineup',
      textoEnlace: 'Ver lineup'
    }
  ];
}