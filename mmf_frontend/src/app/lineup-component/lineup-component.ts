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
    { name: 'IRON STORM', schedule: 'Sábado 16 Julio - 20:00', genre: 'Heavy Metal', image: '/assets/images/band1.jpg'  },
    { name: 'DARK ABYSS', schedule: 'Sábado 16 Julio - 20:30h', genre: 'Death Metal', image: '/assets/images/band2.jpg'  },
    { name: 'STEEL THUNDER', schedule: 'Sábado 16 Julio - 21:00h', genre: 'Thrash Metal', image: '/assets/images/band1.jpg'  },
    { name: 'CRIMSON VOID', schedule: 'Sábado 16 Julio - 21:30h', genre: 'Black Metal', image: '/assets/images/band2.jpg'  },
    { name: 'ETERNAL FLAME', schedule: 'Sábado 16 Julio - 22:00h', genre: 'Power Metal', image: '/assets/images/band1.jpg'  },
    { name: 'NEXUS THEORY', schedule: 'Sábado 16 Julio - 22:30h', genre: 'Progressive Metal', image: '/assets/images/band2.jpg' }
  ];
}
