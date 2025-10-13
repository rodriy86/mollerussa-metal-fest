// backend/data/mockData.js - DATOS MOCK METAL FEST
export const mockData = {
  bands: [
    {
      id: 1,
      name: "Metallica",
      genre: "Thrash Metal",
      country: "USA",
      year: 1981,
      image: "/assets/bands/metallica.jpg",
      description: "Los reyes del thrash metal, conocidos por su energía en vivo y clásicos como 'Master of Puppets' y 'Enter Sandman'."
    },
    {
      id: 2,
      name: "Iron Maiden",
      genre: "Heavy Metal",
      country: "UK",
      year: 1975,
      image: "/assets/bands/iron-maiden.jpg",
      description: "Leyendas del heavy metal con su mascota Eddie y épicos como 'The Trooper' y 'Fear of the Dark'."
    },
    {
      id: 3,
      name: "Slipknot",
      genre: "Nu Metal",
      country: "USA",
      year: 1995,
      image: "/assets/bands/slipknot.jpg",
      description: "Conocidos por sus máscaras y su intenso show en vivo, mezclando metal extremo con elementos experimentales."
    },
    {
      id: 4,
      name: "Gojira",
      genre: "Progressive Metal",
      country: "France",
      year: 1996,
      image: "/assets/bands/gojira.jpg",
      description: "Pioneros del metal progresivo francés con mensajes ecologistas y sonido técnico y pesado."
    }
  ],

  events: [
    {
      id: 1,
      name: "Noche de Thrash Metal",
      date: "2024-06-15",
      time: "20:00",
      stage: "Escenario Principal",
      bands: [1, 3], // Metallica, Slipknot
      price: 45,
      availableTickets: 150
    },
    {
      id: 2,
      name: "Heavy Metal Classics",
      date: "2024-06-16",
      time: "19:30",
      stage: "Escenario Principal",
      bands: [2], // Iron Maiden
      price: 40,
      availableTickets: 200
    },
    {
      id: 3,
      name: "Metal Progresivo Internacional",
      date: "2024-06-17",
      time: "21:00",
      stage: "Escenario Secundario",
      bands: [4], // Gojira
      price: 35,
      availableTickets: 100
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
export const getEventById = (id) => mockData.events.find(event => event.id === id);
export const getEventsByDate = (date) => mockData.events.filter(event => event.date === date);