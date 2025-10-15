// configGlobal.ts - Configuración global del Mollerussa Metal Fest
class GlobalConfig {
  // ==================== DETECCIÓN DE ENTORNO ====================
  private readonly isDev = window.location.hostname === 'localhost' && window.location.port === '4200';
  private readonly baseUrl = this.isDev ? 'http://localhost:3000' : '';

  // ==================== INFORMACIÓN DEL FESTIVAL ====================
  readonly festival = {
    nombre1: 'Mollerussa',
    nombre2: 'Metalfest',
    nombreCompleto: 'Mollerussa Metal Fest ',
    eslogan: 'El festival de metal de referencia en Lleida',
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
    fechaInicio: '25 Julio 2026',
    fechaFin: '',
    dias: ['Sabado', '-'],
    horario: {
      apertura: '18:00h',
      cierre: '00:00h'
    },
    diaEntradasVenta: 'Próximamente'
  };

  // ==================== CONTACTOS Y REDES SOCIALES ====================
  readonly contactos = {
    email: 'info@mollerussametalfest.com',
    telefono: '+34 123 456 789',
    ubicacion: 'Mollerussa, Lleida',
    redes: {
      facebook: '',
      instagram: '', 
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
    ventaInicio: '1 Enero 2026',
    ventaFin: '14 Julio 2026',
    precios: {
      primeres100: 45,
      normal: 45,
      taquilla: 80
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