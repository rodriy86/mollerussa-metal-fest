// backend/data/mockData.js - DATOS MOCK METAL FEST
export const mockData = {
  bands: [
    { 
      id: 1,
      name: 'IRON STORM xd', 
      schedule: 'Sábado 16 Julio - 20:00', 
      genre: 'Heavy Metal', 
      image: '/assets/images/band1.jpg',
      description: 'Potente heavy metal con influencias clásicas y melodías épicas.',
      country: 'España',
      year: 2015
    },
    { 
      id: 2,
      name: 'DARK ABYSS', 
      schedule: 'Sábado 16 Julio - 20:30h', 
      genre: 'Death Metal', 
      image: '/assets/images/band2.jpg',
      description: 'Death metal técnico con letras sobre oscuridad y misterio.',
      country: 'España', 
      year: 2018
    },
    { 
      id: 3,
      name: 'STEEL THUNDER', 
      schedule: 'Sábado 16 Julio - 21:00h', 
      genre: 'Thrash Metal', 
      image: '/assets/images/band1.jpg',
      description: 'Thrash metal acelerado con riffs potentes y energía en directo.',
      country: 'España',
      year: 2012
    },
    { 
      id: 4,
      name: 'CRIMSON VOID', 
      schedule: 'Sábado 16 Julio - 21:30h', 
      genre: 'Black Metal', 
      image: '/assets/images/band2.jpg',
      description: 'Atmosférico black metal con influencias nórdicas y sonido crudo.',
      country: 'España',
      year: 2019
    },
    { 
      id: 5,
      name: 'ETERNAL FLAME', 
      schedule: 'Sábado 16 Julio - 22:00h', 
      genre: 'Power Metal', 
      image: '/assets/images/band1.jpg',
      description: 'Power metal sinfónico con voces operísticas y temáticas épicas.',
      country: 'España',
      year: 2016
    },
    { 
      id: 6,
      name: 'NEXUS THEORY', 
      schedule: 'Sábado 16 Julio - 22:30h', 
      genre: 'Progressive Metal', 
      image: '/assets/images/band2.jpg',
      description: 'Metal progresivo con estructuras complejas y cambios de tempo.',
      country: 'España',
      year: 2020
    }
  ],

  noticias: [
  {
    id: 1,
    fecha: '15 Enero 2026',
    categoria: 'LINEUP',
    colorCategoria: 'bg-red-600',
    titulo: '¡Confirmado! Cor Rebel se suma a la cartelera 2026',
    resumenNoticia: 'La legendaria banda de black metal finlandesa actuará el sábado 16 de julio en el escenario principal. Una adición épica que promete momentos inolvidables.',
    articuloNoticia: 'bla bla bla',
    imagen: 'C:/Users/Jordi/mmf_web/frontend/public/assets/images/noti1.jpg',
    alt: 'Nueva banda confirmada',
    enlace: '#Lineup',
    textoEnlace: 'Ver cartelera'
  },
  {
    id: 2,
    fecha: '10 Enero 2026',
    categoria: 'MERCHANDAISING',
    colorCategoria: 'bg-blue-600',
    titulo: 'Purin confirma!',
    resumenNoticia: 'Purin confirma nuestra cita en el Festival por segunda vez consecutiva! Tendran su stand montado para la venta de merchandaising y mucho mas, aprobecha esta oportunidad para llevar a purin siempre contigo.',
    articuloNoticia: '',
    imagen: 'C:/Users/Jordi/mmf_web/frontend/public/assets/images/foto8.jpg',
    alt: 'Merchandising 2026',
    enlace: '#Lineup',
    textoEnlace: 'Ver cartelera'
  },
  {
    id: 3,
    fecha: '5 Enero 2026',
    categoria: 'ENTRADAS',
    colorCategoria: 'bg-yellow-600',
    titulo: '¡Últimos días y pocas entradas!',
    resumenNoticia: 'No te pierdas la oportunidad de conseguir tu entrada al mejor precio.',
    articuloNoticia: '',
    imagen: 'C:/Users/Jordi/mmf_web/frontend/public/assets/images/noti2.jpg',
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
    resumenNoticia: 'Este año contaremos con un escenario principal renovado y una zona más amplia con mejores servicios para ofrecer la mejor experiencia posible.',
    articuloNoticia: '',
    imagen: 'C:/Users/Jordi/mmf_web/frontend/public/assets/images/noti3.jpg',
    enlace: '#',
    textoEnlace: ''
  },
  {
    id: 5,
    fecha: '20 Diciembre 2024',
    categoria: 'SOSTENIBILIDAD',
    colorCategoria: 'bg-green-600',
    titulo: 'Mollerussa Metal Fest 2025: Comprometidos con el medio ambiente',
    resumenNoticia: 'Implementamos nuevas medidas ecológicas incluyendo reciclaje, energías renovables y reducción de residuos para un festival más sostenible.',
    articuloNoticia: '',
    imagen: 'C:/Users/Jordi/mmf_web/frontend/public/assets/images/noti4.jpg',
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
    resumenNoticia: 'Por primera vez en la historia del festival, dos de nuestros headliners se unirán para una actuación especial que promete ser histórica.',
    articuloNoticia: '',
    imagen: 'C:/Users/Jordi/mmf_web/frontend/public/assets/images/noti5.jpg',
    alt: 'Colaboración especial',
    enlace: '#lineup',
    textoEnlace: 'Ver cartelera'
  }
],

  lineup: [
    {
      day: "Viernes 15 Junio",
      stages: [
        {
          name: "Escenario Principal",
          schedule: [
            { time: "18:00", band: "Apertura Local" },
            { time: "20:00", band: "Slipknot" },
            { time: "22:30", band: "Metallica" }
          ]
        },
        {
          name: "Escenario Underground",
          schedule: [
            { time: "17:00", band: "Bandas Emergentes" },
            { time: "19:00", band: "Competición Metal" }
          ]
        }
      ]
    },
    {
      day: "Sábado 16 Junio",
      stages: [
        {
          name: "Escenario Principal",
          schedule: [
            { time: "18:30", band: "Bandas Tributo" },
            { time: "20:30", band: "Iron Maiden" }
          ]
        }
      ]
    }
  ],

  tickets: [
    {
      id: 1,
      type: "Pase 1 Día",
      price: 45,
      benefits: ["Acceso 1 día", "1 consumición"]
    },
    {
      id: 2,
      type: "Pase 3 Días",
      price: 120,
      benefits: ["Acceso 3 días", "3 consumiciones", "Merchandising exclusivo"]
    },
    {
      id: 3,
      type: "VIP",
      price: 200,
      benefits: ["Acceso 3 días", "Zona VIP", "Meet & Greet", "Merchandising pack"]
    }
  ]
};

// Funciones auxiliares 
export const getBandById = (id) => mockData.bands.find(band => band.id === id);
export const getAllGenres = () => {
  const genres = [...new Set(mockData.bands.map(band => band.genre))];
  return genres;
};
/*
export const getBandsByGenre = (genre) => {
  return mockData.bands.filter(band => 
    band.genre.toLowerCase() === genre.toLowerCase()
  );
};

export const getBandByName = (name) => {
  return mockData.bands.find(band => 
    band.name.toLowerCase() === name.toLowerCase()
  );
};*/

