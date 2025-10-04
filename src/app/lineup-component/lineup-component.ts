import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Band {
  name: string;
  schedule: string;
  genre: string;
  image: string;
}

@Component({
  selector: 'app-lineup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lineup-component.html',
  styleUrl: './lineup-component.html'
})
export class LineupComponent{


  bands: Band[] = [
    { name: 'IRON STORM', schedule: 'Viernes 15 Julio - 23:00h', genre: 'Heavy Metal', image: '/assets/images/band1.jpg'  },
    { name: 'DARK ABYSS', schedule: 'Sábado 16 Julio - 22:30h', genre: 'Death Metal', image: '/assets/images/band2.jpg'  },
    { name: 'STEEL THUNDER', schedule: 'Domingo 17 Julio - 21:00h', genre: 'Thrash Metal', image: '/assets/images/band1.jpg'  },
    { name: 'CRIMSON VOID', schedule: 'Viernes 15 Julio - 20:00h', genre: 'Black Metal', image: '/assets/images/band2.jpg'  },
    { name: 'ETERNAL FLAME', schedule: 'Sábado 16 Julio - 19:30h', genre: 'Power Metal', image: '/assets/images/band1.jpg'  },
    { name: 'NEXUS THEORY', schedule: 'Domingo 17 Julio - 18:00h', genre: 'Progressive Metal', image: '/assets/images/band2.jpg' }
  ];
}
