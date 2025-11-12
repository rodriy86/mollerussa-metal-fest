import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterModule } from '@angular/router'; //per canviar de pagina a una altra


@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-component.html',
  styleUrl: './galeria-component.html',
})
export class GaleriaComponent {
  galeriaImages = [
    {
      src: "https://readdy.ai/api/search-image?query=metal%20festival%20crowd%20with%20hands%20raised%2C%20concert%20atmosphere%2C%20stage%20lights%2C%20energetic%20audience%2C%20metal%20concert%20photography%2C%20festival%20crowd%20from%20behind%20stage%20view%2C%20dramatic%20lighting&width=400&height=300&seq=gallery001&orientation=landscape",
      alt: "Público del festival"
    },
    {
      src: "https://readdy.ai/api/search-image?query=metal%20band%20performing%20on%20main%20stage%2C%20powerful%20concert%20lighting%2C%20smoke%20effects%2C%20electric%20guitars%2C%20festival%20main%20stage%20setup%2C%20professional%20concert%20photography%2C%20dramatic%20stage%20presence&width=400&height=300&seq=gallery002&orientation=landscape",
      alt: "Escenario principal"
    },
    {
      src: "https://readdy.ai/api/search-image?query=metal%20festival%20food%20area%2C%20food%20trucks%20at%20night%2C%20festival%20atmosphere%2C%20people%20eating%20and%20socializing%2C%20outdoor%20festival%20dining%20area%2C%20evening%20festival%20scene&width=400&height=300&seq=gallery003&orientation=landscape",
      alt: "Zona de food trucks"
    },
    {
      src: "https://readdy.ai/api/search-image?query=metal%20festival%20merchandise%20stand%2C%20band%20t-shirts%20and%20posters%2C%20festival%20merchandise%20booth%2C%20metal%20music%20memorabilia%2C%20festival%20shopping%20area%2C%20band%20merchandise%20display&width=400&height=300&seq=gallery004&orientation=landscape",
      alt: "Merchandising"
    },
    {
      src: "https://readdy.ai/api/search-image?query=metal%20festival%20camping%20area%20at%20night%2C%20tents%20and%20campers%2C%20festival%20camping%20atmosphere%2C%20people%20around%20campfires%2C%20outdoor%20festival%20camping%20experience%2C%20evening%20camping%20scene&width=400&height=300&seq=gallery005&orientation=landscape",
      alt: "Zona de camping"
    },
    {
      src: "https://readdy.ai/api/search-image?query=metal%20festival%20aerial%20view%2C%20festival%20grounds%20from%20above%2C%20main%20stage%20and%20crowd%2C%20festival%20layout%20overview%2C%20aerial%20festival%20photography%2C%20large%20outdoor%20music%20festival&width=400&height=300&seq=gallery006&orientation=landscape",
      alt: "Vista aérea del festival"
    },
    {
      src: "://readdy.ai/api/search-image?query=metal%20festival%20aerial%20view%2C%20festival%20grounds%20from%20above%2C%20main%20stage%20and%20crowd%2C%20festival%20layout%20overview%2C%20aerial%20festival%20photography%2C%20large%20outdoor%20music%20festival&width=400&height=300&seq=gallery006&orientation=landscape",
      alt: "Vista aérea del festival"
    }
  ];
}


