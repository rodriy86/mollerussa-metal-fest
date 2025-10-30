// backend/data/mockData.js - DATOS MOCK SQLite STYLE
export const mockData = {
  bands: [
    { 
      id: 1,
      name: 'IRON STORM', 
      schedule: 'Sábado 16 Julio - 20:00', 
      genre: 'Heavy Metal', 
      image: '/assets/images/band1.jpg',
      description: 'Potente heavy metal con influencias clásicas y melodías épicas.',
      country: 'España',
      year: 2015,
      created_at: '2024-01-15 10:00:00',
      updated_at: '2024-01-15 10:00:00'
    },
    { 
      id: 2,
      name: 'DARK ABYSS', 
      schedule: 'Sábado 16 Julio - 20:30h', 
      genre: 'Death Metal', 
      image: '/assets/images/band2.jpg',
      description: 'Death metal técnico con letras sobre oscuridad y misterio.',
      country: 'España', 
      year: 2018,
      created_at: '2024-01-15 10:00:00',
      updated_at: '2024-01-15 10:00:00'
    },
    { 
      id: 3,
      name: 'STEEL THUNDER', 
      schedule: 'Sábado 16 Julio - 21:00h', 
      genre: 'Thrash Metal', 
      image: '/assets/images/band1.jpg',
      description: 'Thrash metal acelerado con riffs potentes y energía en directo.',
      country: 'España',
      year: 2012,
      created_at: '2024-01-15 10:00:00',
      updated_at: '2024-01-15 10:00:00'
    },
    { 
      id: 4,
      name: 'CRIMSON VOID', 
      schedule: 'Sábado 16 Julio - 21:30h', 
      genre: 'Black Metal', 
      image: '/assets/images/band2.jpg',
      description: 'Atmosférico black metal con influencias nórdicas y sonido crudo.',
      country: 'España',
      year: 2019,
      created_at: '2024-01-15 10:00:00',
      updated_at: '2024-01-15 10:00:00'
    },
    { 
      id: 5,
      name: 'ETERNAL FLAME', 
      schedule: 'Sábado 16 Julio - 22:00h', 
      genre: 'Power Metal', 
      image: '/assets/images/band1.jpg',
      description: 'Power metal sinfónico con voces operísticas y temáticas épicas.',
      country: 'España',
      year: 2016,
      created_at: '2024-01-15 10:00:00',
      updated_at: '2024-01-15 10:00:00'
    },
    { 
      id: 6,
      name: 'NEXUS THEORY', 
      schedule: 'Sábado 16 Julio - 22:30h', 
      genre: 'Progressive Metal', 
      image: '/assets/images/band2.jpg',
      description: 'Metal progresivo con estructuras complejas y cambios de tempo.',
      country: 'España',
      year: 2020,
      created_at: '2024-01-15 10:00:00',
      updated_at: '2024-01-15 10:00:00'
    }
  ],

  noticias: [
    {
      id: 1,
      fecha: '1 Febrero 2026',
      categoria: '-',
      colorCategoria: 'bg-red-600',
      titulo: 'Dinar solidari',
      resumenNoticia: 'La organització del Mollerussa Metal Fest organitzara un dinar solidari a la serra el dia 1/2/26',
      detalleNoticia: true,  
      imagen: '/assets/images/menja.png',
      alt: 'Dinar solidari',
      enlace: '#',
      textoEnlace: 'Ver cartelera',
      created_at: '2026-01-15 09:00:00'
    },
    {
      id: 2,
      fecha: '15 Enero 2026',
      categoria: 'LINEUP',
      colorCategoria: 'bg-red-600',
      titulo: '¡Confirmado! Cor Rebel se suma a la cartelera 2026',
      resumenNoticia: 'La legendaria banda de black metal finlandesa actuará el sábado 16 de julio en el escenario principal. Una adición épica que promete momentos inolvidables.',
      detalleNoticia: true,  
      imagen: '/assets/images/noti1.jpg',
      alt: 'Nueva banda confirmada',
      enlace: '#Lineup',
      textoEnlace: 'Ver cartelera',
      created_at: '2026-01-15 09:00:00'
    },
    {
      id: 3,
      fecha: '10 Enero 2026',
      categoria: 'MERCHANDAISING',
      colorCategoria: 'bg-blue-600',
      titulo: 'Purin confirma!',
      resumenNoticia: 'Purin confirma nuestra cita en el Festival por segunda vez consecutiva! Tendran su stand montado para la venta de merchandaising y mucho mas, aprobecha esta oportunidad para llevar a purin siempre contigo.',
      detalleNoticia: true, 
      imagen: '/assets/images/foto8.jpg',
      alt: 'Merchandising 2026',
      enlace: '#Lineup',
      textoEnlace: 'Ver cartelera',
      created_at: '2026-01-10 11:30:00'
    },
    {
      id: 4,
      fecha: '5 Enero 2026',
      categoria: 'ENTRADAS',
      colorCategoria: 'bg-yellow-600',
      titulo: '¡Últimos días y pocas entradas!',
      resumenNoticia: 'No te pierdas la oportunidad de conseguir tu entrada al mejor precio.',
      detalleNoticia: false,  
      imagen: '/assets/images/noti2.jpg',
      alt: 'Early Bird tickets',
      enlace: '#Entradas',
      textoEnlace: 'Comprar entradas',
      created_at: '2026-01-05 14:15:00'
    },
    {
      id: 5,
      fecha: '28 Diciembre 2025',
      categoria: 'RECINTO',
      colorCategoria: 'bg-green-600',
      titulo: 'Mejoras en el recinto: nuevo escenario',
      resumenNoticia: 'Este año contaremos con un escenario principal renovado y una zona más amplia con mejores servicios para ofrecer la mejor experiencia posible.',
      detalleNoticia: false,  
      imagen: '/assets/images/noti3.jpg',
      enlace: '#',
      textoEnlace: '',
      created_at: '2025-12-28 16:45:00',
      updated_at: '2025-12-28 16:45:00'
    },
    {
      id: 6,
      fecha: '20 Diciembre 2025',
      categoria: 'SOSTENIBILIDAD',
      colorCategoria: 'bg-green-600',
      titulo: 'Mollerussa Metal Fest 2025: Comprometidos con el medio ambiente',
      resumenNoticia: 'Implementamos nuevas medidas ecológicas incluyendo reciclaje, energías renovables y reducción de residuos para un festival más sostenible.',
      detalleNoticia: false,  
      imagen: '/assets/images/noti4.jpg',
      alt: 'Festival sostenible',
      enlace: '#',
      textoEnlace: '',
      created_at: '2025-12-20 10:20:00',
      updated_at: '2025-12-20 10:20:00'
    },
    {
      id: 7,
      fecha: '15 Diciembre 2025',
      categoria: 'ESPECIAL',
      colorCategoria: 'bg-purple-600',
      titulo: 'Colaboración épica: Iron Storm y Dark Abyss juntos en el escenario',
      resumenNoticia: 'Por primera vez en la historia del festival, dos de nuestros headliners se unirán para una actuación especial que promete ser histórica.',
      detalleNoticia: false,  
      imagen: '/assets/images/noti5.jpg',
      alt: 'Colaboración especial',
      enlace: '#lineup',
      textoEnlace: 'Ver cartelera',
      created_at: '2025-12-15 12:00:00',
      updated_at: '2025-12-15 12:00:00'
    }
  ],

  // Detalles de noticias - Tabla relacionada
  detalleNoticia: [
     {
      id: 1,
      noticia_id: 1, // Foreign key a noticias.id
      fecha: '1 Febrero 2026',
      categoria: 'Eventos',
      titulo: 'Dinar solidari',
      descripcionCorta: 'La legendaria banda de black metal finlandesa actuará el sábado 16 de julio en el escenario principal del Mollerussa Metal Fest 2026.',
      contenido: JSON.stringify([ // SQLite almacena arrays como JSON
        'El Mollerussa Metal Fest 2026 sigue sumando grandes nombres a su cartel y hoy tenemos el placer de anunciar oficialmente la confirmación de Cor Rebel, una de las bandas más respetadas y temidas del black metal Catalan.',
        'La formación de Mollerussa actuará el sábado 16 de julio a las 21:30h en el escenario principal, ofreciendo una actuación que promete ser uno de los momentos más intensos e inolvidables del festival.',
        'Tras meses de negociaciones y expectación por parte de los fans, finalmente podemos confirmar que Cor Rebel pisará La Amistat.',
        'La banda, ha sido durante décadas una de las referencias indiscutibles de Lleida.'
      ]),
      imagenPrincipal: '/assets/images/menja.png',
      autor: 'Redacción MMF',
      tiempoLectura: '8 min',
      visualizaciones: '1.2k',
      imagenes: JSON.stringify(['/assets/images/xxx.jpg']),
      videos: JSON.stringify([]),
      created_at: '2026-01-15 09:00:00',
      updated_at: '2026-01-15 09:00:00',
      boton: true,
      textoBoton: 'Comprar ticket'
    },
    {
      id: 2,
      noticia_id: 2, // Foreign key a noticias.id
      fecha: '15 Enero 2026',
      categoria: 'LINEUP',
      titulo: '¡Confirmado! Cor Rebel se suma a la cartelera 2026',
      descripcionCorta: 'La legendaria banda de black metal finlandesa actuará el sábado 16 de julio en el escenario principal del Mollerussa Metal Fest 2026.',
      contenido: JSON.stringify([ // SQLite almacena arrays como JSON
        'El Mollerussa Metal Fest 2026 sigue sumando grandes nombres a su cartel y hoy tenemos el placer de anunciar oficialmente la confirmación de Cor Rebel, una de las bandas más respetadas y temidas del black metal Catalan.',
        'La formación de Mollerussa actuará el sábado 16 de julio a las 21:30h en el escenario principal, ofreciendo una actuación que promete ser uno de los momentos más intensos e inolvidables del festival.',
        'Tras meses de negociaciones y expectación por parte de los fans, finalmente podemos confirmar que Cor Rebel pisará La Amistat.',
        'La banda, ha sido durante décadas una de las referencias indiscutibles de Lleida.'
      ]),
      imagenPrincipal: '/assets/images/cap_noti1.jpg',
      autor: 'Redacción MMF',
      tiempoLectura: '8 min',
      visualizaciones: '1.2k',
      imagenes: JSON.stringify(['/assets/images/desc_noti1.jpg']),
      videos: JSON.stringify([]),
      created_at: '2026-01-15 09:00:00',
      updated_at: '2026-01-15 09:00:00',
      boton: false,
      textoBoton: ''
    },
    {
      id: 3,
      noticia_id: 2, // Foreign key a noticias.id
      fecha: '10 Enero 2026',
      categoria: 'MERCHANDAISING', 
      titulo: 'Purin confirma!',
      descripcionCorta: 'Purin confirma nuestra cita en el Festival por segunda vez consecutiva!',
      contenido: JSON.stringify([
        'Purin, la reconocida marca de merchandising metalero, ha confirmado oficialmente su participación en el Mollerussa Metal Fest 2026 por segundo año consecutivo.',
        'Los fans podrán encontrar en su stand una amplia variedad de productos exclusivos: camisetas de edición limitada, pines, parches, y mucho más.',
        'Además, Purin traerá novedades especiales diseñadas específicamente para esta edición del festival.',
        'No te pierdas la oportunidad de llevar contigo un recuerdo único de esta experiencia metalera.'
      ]),
      imagenPrincipal: '/assets/images/foto8.jpg',
      autor: 'Redacción MMF',
      tiempoLectura: '5 min', 
      visualizaciones: '890',
      imagenes: JSON.stringify(['/assets/images/camisa.jpg', '/assets/images/gorra.jpg']),
      videos: JSON.stringify([]),
      created_at: '2026-01-10 11:30:00',
      updated_at: '2026-01-10 11:30:00',
      boton: false,
      textoBoton: ''
    }
  ],

  lineup: [
    {
      id: 1,
      day: "Viernes 15 Junio",
      created_at: '2024-01-15 10:00:00'
    },
    {
      id: 2,
      day: "Sábado 16 Junio", 
      created_at: '2024-01-15 10:00:00'
    }
  ],

  stages: [
    {
      id: 1,
      lineup_id: 1,
      name: "Escenario Principal",
      created_at: '2024-01-15 10:00:00'
    },
    {
      id: 2,
      lineup_id: 1, 
      name: "Escenario Underground",
      created_at: '2024-01-15 10:00:00'
    },
    {
      id: 3,
      lineup_id: 2,
      name: "Escenario Principal",
      created_at: '2024-01-15 10:00:00'
    }
  ],

  schedule: [
    { id: 1, stage_id: 1, time: "18:00", band: "Apertura Local", created_at: '2024-01-15 10:00:00' },
    { id: 2, stage_id: 1, time: "20:00", band: "Slipknot", created_at: '2024-01-15 10:00:00' },
    { id: 3, stage_id: 1, time: "22:30", band: "Metallica", created_at: '2024-01-15 10:00:00' },
    { id: 4, stage_id: 2, time: "17:00", band: "Bandas Emergentes", created_at: '2024-01-15 10:00:00' },
    { id: 5, stage_id: 2, time: "19:00", band: "Competición Metal", created_at: '2024-01-15 10:00:00' },
    { id: 6, stage_id: 3, time: "18:30", band: "Bandas Tributo", created_at: '2024-01-15 10:00:00' },
    { id: 7, stage_id: 3, time: "20:30", band: "Iron Maiden", created_at: '2024-01-15 10:00:00' }
  ],

  tickets: [
    {
      id: 1,
      type: "Pase 1 Día",
      price: 45,
      benefits: JSON.stringify(["Acceso 1 día", "1 consumición"]),
      created_at: '2024-01-15 10:00:00',
      updated_at: '2024-01-15 10:00:00'
    },
    {
      id: 2,
      type: "Pase 3 Días", 
      price: 120,
      benefits: JSON.stringify(["Acceso 3 días", "3 consumiciones", "Merchandising exclusivo"]),
      created_at: '2024-01-15 10:00:00',
      updated_at: '2024-01-15 10:00:00'
    },
    {
      id: 3,
      type: "VIP",
      price: 200,
      benefits: JSON.stringify(["Acceso 3 días", "Zona VIP", "Meet & Greet", "Merchandising pack"]),
      created_at: '2024-01-15 10:00:00',
      updated_at: '2024-01-15 10:00:00'
    }
  ],
};

// Funciones auxiliares - SQLite Style
export const getBandById = (id) => mockData.bands.find(band => band.id === id);

export const getAllGenres = () => {
  const genres = [...new Set(mockData.bands.map(band => band.genre))];
  return genres;
};

export const getNoticiaById = (id) => mockData.noticias.find(noticia => noticia.id === id);

export const getDetalleNoticiaById = (id) => {
  const detalle = mockData.detalleNoticia.find(detalle => detalle.noticia_id === id);
  if (!detalle) return null;
  
  // Parsear JSON como lo haría SQLite
  return {
    ...detalle,
    contenido: JSON.parse(detalle.contenido),
    imagenes: JSON.parse(detalle.imagenes),
    videos: JSON.parse(detalle.videos)
  };
};

export const getNoticiasConDetalle = () => 
  mockData.noticias.filter(noticia => noticia.tiene_detalle === 1);

export const getLineupCompleto = () => {
  return mockData.lineup.map(day => ({
    ...day,
    stages: mockData.stages
      .filter(stage => stage.lineup_id === day.id)
      .map(stage => ({
        ...stage,
        schedule: mockData.schedule.filter(item => item.stage_id === stage.id)
      }))
  }));
};