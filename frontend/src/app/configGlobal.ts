// configGlobal.ts - Configuración global del Mollerussa Metal Fest
class GlobalConfig {
  // ==================== DETECCIÓN DE ENTORNO ====================
  private readonly isDev = window.location.hostname === 'localhost' && window.location.port === '4200';
  private readonly baseUrl = this.isDev ? 'http://localhost:3000' : '';

  // ==================== CONFIGURACIÓN DE IDIOMA ====================
  private _currentLanguage = 'es'; // Idioma por defecto

  get currentLanguage(): string {
    // Intentar cargar del localStorage al acceder
    const saved = localStorage.getItem('mmf_language');
    if (saved) {
      this._currentLanguage = saved;
    }
    return this._currentLanguage;
  }

  set currentLanguage(lang: string) {
    this._currentLanguage = lang;
    localStorage.setItem('mmf_language', lang);
  }

  readonly availableLanguages = [
    { code: 'es', name: 'Español', flag: 'fi fi-es fis' },
    { code: 'ca', name: 'Català', flag: 'catalan-flag' },
    { code: 'en', name: 'English', flag: 'fi fi-gb fis' }
  ];

  // ==================== INFORMACIÓN DEL FESTIVAL ====================
  readonly festival = {
    nombre1: 'Mollerussa',
    nombre2: 'Metalfest',
    nombreCompleto: 'Mollerussa Metal Fest ',
    eslogan: 'El festival de metal de referencia en Lleida',
    NIF: "00000000#",
    ubicacion: {
      nombreRecinto: 'Teatre La Amistat',
      ciudad: 'Mollerussa, Lleida',
      direccion: "Plaça 1 d'octubre",
      googleMaps: 'https://maps.google.com/?q=Mollerussa+Lleida',
      CP: '25230'
    },
    capacidad: '550',
    edicion: '3ª Edición',
    anyo: 2026,
    fechaInicio: '2026-07-15',
    fechaFin: '',
    dias: ['Sabado', '-'],
    horario: {
      apertura: '18:00h',
      cierre: '00:00h'
    }
  };

  // ==================== CONTACTOS Y REDES SOCIALES ====================
  readonly contactos = {
    email: 'info@mollerussametalfest.com',
    telefono: '+34 123 456 789',
    ubicacion: 'Mollerussa, Lleida',
    web: 'www.mollerussametalfest.cat',
    redes: {
      facebook: '',
      instagram: 'https://www.instagram.com/mollerussametalfest/', 
      twitter: '',
      youtube: ''
    }
  };

  // ==================== APIs ====================
  readonly api = {
    // Endpoints principales
    noticias: `${this.baseUrl}/api/noticias`,
    bands: `${this.baseUrl}/api/bands`,
    tickets: `${this.baseUrl}/api/tickets`,
    events: `${this.baseUrl}/api/events`,
    health: `${this.baseUrl}/api/health`,
    
    // Funciones para endpoints con parámetros
    detalleNoticia: (id: number) => `${this.baseUrl}/api/noticias/${id}/detalle`,
    bandaPorId: (id: number) => `${this.baseUrl}/api/bands/${id}`
  };

  // ==================== CONFIGURACIÓN DE LA APP ====================
  readonly app = {
    nombre: 'Mollerussa Metal Fest',
    version: '1.0.0',
    desarrollador: 'Jordi Rodriguez Pinos',
    año: 2026
  };

  // ==================== TICKETS Y PRECIOS ====================
  readonly tickets = {
    ventaInicio: 'Próximamente',
    ventaFin: '-',
    habilitar: false,
    precios: {
      primeres100: 80,
      normal: 100,
      masCaniseta: 110,
      taquilla: 140
    },
    get ventaActiva(): boolean {
      const hoy = new Date();
      const inicio = new Date('2026-01-01');
      const fin = new Date('2026-07-14');
      return hoy >= inicio && hoy <= fin;
    }
  };

  // ==================== UTILIDADES ====================
  readonly utils = {
    isDevelopment: this.isDev,
    baseUrl: this.baseUrl,
    currentLanguage: this.currentLanguage,
    
    // Métodos para manejar idioma
    setLanguage: (lang: string) => {
      configGlobal.currentLanguage = lang;
    },
    
    getLanguage: () => {
      return configGlobal.currentLanguage;
    },

    // Logs con prefijo de la app
    log: (message: string, data?: any) => {
      console.log(`🎸 MMF - ${message}`, data || '');
    },
    
    error: (message: string, error?: any) => {
      console.error(`❌ MMF - ${message}`, error || '');
    },

    // Formatear fechas
    formatearFecha: (fecha: string) => {
      return new Date(fecha).toLocaleDateString('es-ES');
    }
  };
}

// Exportar instancia única (Singleton)
export const configGlobal = new GlobalConfig();