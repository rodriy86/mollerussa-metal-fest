// server.js - SERVIDOR MOLLERUSSA METAL FEST
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockData, getBandById, getDetalleNoticiaById} from './data/mockData.js';
import dotenv from 'dotenv';


dotenv.config();

// Configuración de paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const angularPath = path.join(__dirname, '../frontend/dist/mmf-web/browser');
//const authRoutes = require('./src/routes/authRoutes');

// Tipos MIME para archivos estáticos
const mimeTypes = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};

// Utilidades de respuesta
const sendJson = (res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
};

const sendError = (res, code, message) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
};

// Extraer ID de la URL para endpoints con parámetros
const extractIdFromUrl = (url) => {
  const match = url.match(/\/(\d+)(?:\/|$)/);
  return match ? parseInt(match[1]) : null;
};

// Obtener idioma desde query parameters
const getLanguageFromRequest = (req) => {
  try {
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const url = new URL(fullUrl);
    const langParam = url.searchParams.get('lang');
    const supportedLangs = ['es', 'ca', 'en'];
    return supportedLangs.includes(langParam) ? langParam : 'ca';
  } catch (error) {
    return 'ca';
  }
};

const USERS = mockData.User;


// Enviar email de acreditación
const enviarEmailAcreditacion = async (formData) => {
  try {
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'info.mmf973@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.verify();

    const diasTexto = formData.dias && formData.dias.length > 0
      ? formData.dias.join(', ')
      : 'No especificat';

    const mailOptions = {
      from: `"Mollerussa Metal Fest" <info.mmf973@gmail.com>`,
      to: 'info.mmf973@gmail.com',
      subject: `🔴SOLICITUT D'ACREDITACIÓ - ${formData.tipo} - ${formData.nombre}🔴`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .section { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #dc2626; }
            .label { font-weight: bold; color: #dc2626; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎸 MOLLERUSSA METAL FEST</h1>
            <h2>Solicitut de Acreditació</h2>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>📋 Informació Personal</h3>
              <p><span class="label">Tipo:</span> ${formData.tipo === 'prensa' ? '📰 Mitja de Comunicació' : '🌟 Influencer/Creador'}</p>
              <p><span class="label">Nom:</span> ${formData.nombre}</p>
              <p><span class="label">Email:</span> ${formData.email}</p>
              <p><span class="label">Teléfon:</span> ${formData.telefono || 'No especificat'}</p>
              <p><span class="label">Document:</span> ${formData.documentoIdentidad || 'No especificat'}</p>
              <p><span class="label">Ciudat/País:</span> ${formData.ciudadResidencia || 'No especificat'}</p>
              <p><span class="label">Reds Socials:</span> ${formData.redesSociales || 'No especificat'}</p>
            </div>

            ${formData.tipo === 'prensa' ? `
            <div class="section">
              <h3>📰 Informació del Mitja</h3>
              <p><span class="label">Medio:</span> ${formData.medio || 'No especificat'}</p>
            </div>
            ` : `
            <div class="section">
              <h3>🌟 Informació del Creado</h3>
              <p><span class="label">Plataformes i Seguidors:</span><br>${formData.plataformas || 'No especificat'}</p>
            </div>
            `}

            <div class="section">
              <h3>📝 Cobertura Proposta</h3>
              <p>${(formData.cobertura || 'No especificada').replace(/\n/g, '<br>')}</p>
            </div>

            <div class="section">
              <h3>🔧 Necesitats Especials</h3>
              <p>${formData.necesidadesEspeciales || 'No especificades'}</p>
            </div>

            <div class="section">
              <h3>📅 Díes d'Asistencia</h3>
              <p>${diasTexto}</p>
            </div>

            <div class="section">
              <h3>⏰ Informació de la Solicitut</h3>
              <p><span class="label">Fecha:</span> ${new Date().toLocaleString('es-ES')}</p>
            </div>
          </div>

          <div class="footer">
            <p>🎸 Mollerussa Metal Fest - Sistema d'Acreditacions</p>
          </div>
        </body>
        </html>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    return result;

  } catch (error) {
    throw error;
  }
};
/*
const USERS = [
  {
    id: 3,
      email: 'admin@mmf.cat',
      password: 'a1234',
      name: 'Administrador',
      role: 'admin',
      isActive: true
  }]*/

// Handlers de API endpoints
const apiHandlers = {
  // Endpoint para obtener todas las bandas
  //'/api/bands': (req, res) => sendJson(res, mockData.bands),
  '/api/bands': (req, res) => {
    const lang = getLanguageFromRequest(req);

    const bandsTraducidas = mockData.bands.map(band => {
      const translated = { ...band };
      ['name', 'schedule', 'genre', 'description', 'country'].forEach(field => {
        translated[field] = band[`${field}_${lang}`] || band[field];
      });
      return translated;
    });
    sendJson(res, bandsTraducidas);
  },

  // Endpoint para obtener banda por ID
  /*'/api/bands/:id': (req, res) => {
    const id = extractIdFromUrl(req.url);
    const band = id && getBandById(id);
    band ? sendJson(res, band) : sendError(res, 404, 'Banda no encontrada');
  },*/
  // Endpoint para obtener banda por ID
// Endpoint para obtener banda por ID
'/api/bands/:id': (req, res) => {
  const id = extractIdFromUrl(req.url);
  const lang = getLanguageFromRequest(req);
  
  console.log('🌐 [SERVER] Solicitud de banda ID:', id, 'en idioma:', lang);
  
  if (!id || isNaN(id)) {
    return sendError(res, 400, 'ID de banda inválido');
  }
  
  const band = mockData.bands.find(band => band.id === id);
  
  if (!band) {
    return sendError(res, 404, 'Banda no encontrada');
  }
  
  // Traducir la banda
  const bandaTraducida = {
    ...band,
    name: band[`name_${lang}`] || band.name,
    schedule: band[`schedule_${lang}`] || band.schedule,
    genre: band[`genre_${lang}`] || band.genre,
    description: band[`description_${lang}`] || band.description,
    country: band[`country_${lang}`] || band.country
  };
  
  sendJson(res, bandaTraducida);
},

//Endpoint de login
'/api/auth/login': (req, res) => {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Método no permitido');
  }

  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const { email, password } = JSON.parse(body);
      
      console.log('🔐 Intento de login:', { email });

      // Validar campos requeridos
      if (!email || !password) {
        return sendError(res, 400, 'Email y contraseña son requeridos');
      }

      // Buscar usuario activo
      const user = USERS.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.isActive
      );

      if (!user) {
        console.log('❌ Usuario no encontrado:', email);
        return sendError(res, 401, 'Usuario no encontrado o inactivo');
      }

      // Verificar contraseña (texto plano en mock)
      if (user.password !== password) {
        console.log('❌ Contraseña incorrecta para:', email);
        return sendError(res, 401, 'Contraseña incorrecta');
      }

      // ✅ Login exitoso
      console.log('✅ Login exitoso:', user.email, 'Rol:', user.role);
      
      // Eliminar password del response
      const { password: _, ...userWithoutPassword } = user;

      // Generar token simulado
      const token = `mock-token-${user.id}-${Date.now()}`;

      sendJson(res, {
        success: true,
        token: token,
        user: userWithoutPassword,
        message: 'Login exitoso'
      });

    } catch (error) {
      console.error('❌ Error en login:', error);
      sendError(res, 500, 'Error interno del servidor: ' + error.message);
    }
  });
},

  // Endpoint para noticias con soporte multiidioma
  '/api/noticias': (req, res) => {
    const lang = getLanguageFromRequest(req);

    if (!mockData.noticias) {
      return sendError(res, 500, 'Datos de noticias no disponibles');
    }

    const noticiasTraducidas = mockData.noticias.map(noticia => ({
      ...noticia,
      titulo: noticia[`titulo_${lang}`] || noticia.titulo,
      resumenNoticia: noticia[`resumenNoticia_${lang}`] || noticia.resumenNoticia,
      categoria: noticia[`categoria_${lang}`] || noticia.categoria,
      alt: noticia[`alt_${lang}`] || noticia.alt,
      textoEnlace: noticia[`textoEnlace_${lang}`] || noticia.textoEnlace
    }));

    sendJson(res, noticiasTraducidas);
  },

  // Endpoint para noticia individual con traducción
  '/api/noticias/:id': (req, res) => {
    const id = extractIdFromUrl(req.url);
    const lang = getLanguageFromRequest(req);
    const noticia = id && mockData.noticias.find(n => n.id === id);

    if (noticia) {
      const noticiaTraducida = {
        ...noticia,
        titulo: noticia[`titulo_${lang}`] || noticia.titulo,
        resumenNoticia: noticia[`resumenNoticia_${lang}`] || noticia.resumenNoticia,
        categoria: noticia[`categoria_${lang}`] || noticia.categoria,
        alt: noticia[`alt_${lang}`] || noticia.alt,
        textoEnlace: noticia[`textoEnlace_${lang}`] || noticia.textoEnlace
      };
      sendJson(res, noticiaTraducida);
    } else {
      sendError(res, 404, 'Noticia no encontrada');
    }
  },

  // Endpoint para detalle de noticias
  '/api/noticias/:id/detalle': (req, res) => {
    const id = extractIdFromUrl(req.url);
    const lang = getLanguageFromRequest(req);
    if (!id) {
      return sendError(res, 400, 'ID de noticia requerido');
    }
    const detalleNoticia = getDetalleNoticiaById(id, lang);
    detalleNoticia ? sendJson(res, detalleNoticia) : sendError(res, 404, 'Detalle no encontrado');
  },

  // Endpoint POST para enviar solicitud de acreditación
  '/api/acreditacion': async (req, res) => {
    if (req.method !== 'POST') {
      return sendError(res, 405, 'Método no permitido');
    }

    try {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          const formData = JSON.parse(body);

          if (!formData.nombre || !formData.email || !formData.tipo) {
            return sendError(res, 400, 'Datos incompletos');
          }

          if (!formData.dias) {
            formData.dias = [];
          }

          await enviarEmailAcreditacion(formData);

          // Guardar en archivo JSON como backup
          const acreditacionesPath = path.join(__dirname, 'data', 'acreditaciones.json');
          const acreditaciones = fs.existsSync(acreditacionesPath)
            ? JSON.parse(fs.readFileSync(acreditacionesPath, 'utf8'))
            : [];

          acreditaciones.push({
            ...formData,
            fecha: new Date().toISOString(),
            id: Date.now()
          });

          fs.writeFileSync(acreditacionesPath, JSON.stringify(acreditaciones, null, 2));

          sendJson(res, {
            success: true,
            message: 'Solicitud enviada correctamente',
            id: Date.now()
          });

        } catch (error) {
          sendError(res, 500, 'Error interno del servidor');
        }
      });

    } catch (error) {
      sendError(res, 500, 'Error interno del servidor');
    }
  },

  // Endpoint POST para comida solidaria
'/api/comida-solidaria': async (req, res) => {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Mètode no permès');
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      // 1. PARSEAR DATOS
      const formData = JSON.parse(body);

      // 2. VALIDACIÓN
      const requiredFields = ['nombre', 'apellidos', 'dni'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        return sendError(res, 400, `Falten camps obligatoris: ${missingFields.join(', ')}`);
      }

      // 3. CALCULAR TOTAL
      let totalCalculado = Number(formData.preuTotal) || 0;
      if (!formData.preuTotal || totalCalculado === 0) {
        const precioPorPlato = 10;
        const donacionCancer = 2;
        
        const plato1 = Number(formData.plato1) || 0;
        const platoVegetariano = Number(formData.platoVegetariano) || 0;
        const platoCeliacos = Number(formData.platoCeliacos) || 0;
        const platoInfantil = Number(formData.platoInfantil) || 0;
        
        const totalPlatos = (plato1 + platoVegetariano + platoCeliacos + platoInfantil) * precioPorPlato;
        totalCalculado = totalPlatos;
        
        if (formData.donacionCancer) {
          totalCalculado += donacionCancer;
        }
      }

      // 4. PREPARAR DATOS PARA GOOGLE SHEETS
      const sheetsData = {
        nombre: String(formData.nombre || ''),
        apellidos: String(formData.apellidos || ''),
        dni: String(formData.dni || ''),
        poblacion: String(formData.poblacion || ''),
        telefono: String(formData.telefono || ''),
        email: String(formData.email || ''),
        plat_llongonissa: Number(formData.plato1) || 0,
        plat_escalivada: Number(formData.platoVegetariano) || 0,
        preuTotal: Number(totalCalculado) || 0
      };

      // 5. ENVIAR A GOOGLE SHEETS
      let sheetsSuccess = false;
      let sheetsResponse = null;
      
      try {
        const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxtweNdgZxp4Fd5PmWITG2E_w8P3CkVs9WFTi9QtjRiP84rdSGAoV5JXForsO_e10eA/exec';
        
        const response = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetsData)
        });

        const resultText = await response.text();
        
        try {
          sheetsResponse = JSON.parse(resultText);
          sheetsSuccess = sheetsResponse.success === true;
        } catch {
          sheetsSuccess = resultText.toLowerCase().includes('éxito') || 
                         resultText.toLowerCase().includes('success');
        }

      } catch (sheetsError) {
        console.error('Error Google Sheets:', sheetsError.message);
      }

      // 6. ENVIAR EMAIL
      let emailSent = false;
      let emailResult = null;
      
      try {
        formData.preuTotal = totalCalculado;
        emailResult = await enviarEmailComidaSolidaria(formData);
        emailSent = emailResult.success === true;

      } catch (emailError) {
        console.error('Error email:', emailError.message);
      }

      // 7. RESPONDER
      sendJson(res, {
        success: true,
        message: 'Reserva procesada correctament',
        details: {
          emailSent: emailSent,
          sheetsSaved: sheetsSuccess,
          total: totalCalculado
        }
      });

    } catch (error) {
      console.error('Error procesando reserva:', error.message);
      sendError(res, 500, `Error del servidor: ${error.message}`);
    }
  });
},

  // Otros endpoints básicos
  '/api/events': (req, res) => sendJson(res, mockData.events || []),
  '/api/tickets': (req, res) => sendJson(res, mockData.tickets || []),
  '/api/info': (req, res) => sendJson(res, mockData.info || {}),
  '/api/health': (req, res) => sendJson(res, { status: 'OK', message: 'Mollerussa Metal Fest API' }),
  '/api/galeria_images': (req, res) => sendJson(res, mockData.galeria_images || []),
  '/api/galeria_carteleras': (req, res) => sendJson(res, mockData.galeria_carteleras || []),
};

// Manejar requests a la API
const handleApiRequest = (req, res) => {
  const pathWithoutQuery = req.url.split('?')[0];

  const route = Object.keys(apiHandlers)
    .sort((a, b) => b.length - a.length)
    .find(route => {
      const pattern = new RegExp('^' + route.replace(/:\w+/g, '([^/]+)') + '$');
      return pattern.test(pathWithoutQuery) ||
        pathWithoutQuery === route ||
        pathWithoutQuery.startsWith(route + '/');
    });

  if (route) {
    apiHandlers[route](req, res);
  } else {
    sendError(res, 404, 'Endpoint no encontrado');
  }
};

// Servir archivos estáticos de Angular
const serveStaticFile = (req, res) => {
  const filePath = req.url === '/' || req.url === ''
    ? path.join(angularPath, 'index.html')
    : path.join(angularPath, req.url);

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    // Fallback a index.html para SPA routing
    const indexHtml = path.join(angularPath, 'index.html');
    if (fs.existsSync(indexHtml)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(indexHtml, 'utf8'));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - No encontrado</h1>');
    }
  }
};

// Servidor principal
const server = http.createServer((req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.writeHead(200).end();
  }

  // Enrutar requests a API o archivos estáticos
  if (req.url.startsWith('/api/')) {
    handleApiRequest(req, res);
  } else {
    serveStaticFile(req, res);
  }
});

// Función para enviar email de comida solidaria
const enviarEmailComidaSolidaria = async (formData) => {
  try {
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'info.mmf973@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.verify();

    // Calcular total con donación
    const subtotal = (
      (formData.mayoresPlato1 || 0) * 10 +
      (formData.mayoresPlato2 || 0) * 11 +
      (formData.mayoresCafe || 0) * 2 +
      (formData.mayoresBermut || 0) * 5 +
      (formData.menoresPlato1 || 0) * 10 +
      (formData.menoresPlato2 || 0) * 11
    );

    const donacion = formData.donacionCancer ? 2 : 0;
    const preuTotal = formData.preuTotal || 0; 

    const mailOptions = {
      from: `"Mollerussa Metal Fest" <info.mmf973@gmail.com>`,
      to: 'info.mmf973@gmail.com',
      subject: `🍽️ NOVA RESERVA DINAR SOLIDARI - ${formData.nombre} ${formData.apellidos}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .section { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #dc2626; }
            .label { font-weight: bold; color: #dc2626; }
            .total { background: #dc2626; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; }
            .donacion { background: #ec4899; color: white; padding: 15px; text-align: center; margin: 10px 0; border-radius: 5px; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎸 MOLLERUSSA METAL FEST</h1>
            <h2>Nova Reserva - Dinar Solidari</h2>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>👤 Informació Personal</h3>
              <p><span class="label">Nom:</span> ${formData.nombre} ${formData.apellidos}</p>
              <p><span class="label">DNI:</span> ${formData.dni}</p>
              <p><span class="label">Població:</span> ${formData.poblacion}</p>
            </div>

            <div class="section">
              <p><span class="label">Plat llongonissa (10€):</span> ${formData.plato1 || 0}</p>
              <p><span class="label">Plat Escalivada (10€):</span> ${formData.platoVegetariano || 0}</p>
            </div>

            ${donacion > 0 ? `
            <div class="donacion">
              <h3>🎗️ DONACIÓ SOLIDÀRIA</h3>
              <p><strong>+ ${donacion} € per a l'associació de nens amb càncer</strong></p>
              <p>Gràcies per la teva solidaritat!</p>
            </div>
            ` : ''}

            <div class="total">
              💰 TOTAL: ${preuTotal} €
              ${donacion > 0 ? `<br><small>(Inclou ${donacion}€ de donació solidària)</small>` : ''}
            </div>

            <div class="section">
              <h3>📅 Informació de la Reserva</h3>
              <p><span class="label">Data:</span> ${new Date().toLocaleString('ca-ES')}</p>
              <!--<p><span class="label">Inclou donació:</span> ${formData.donacionCancer ? 'SÍ ✅' : 'NO'}</p>-->
            </div>
          </div>

          <div class="footer">
            <p>🎸 Mollerussa Metal Fest - Dinar Solidari</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Reserva enviada correctament' };

  } catch (error) {
    throw error;
  }
};

// Iniciar servidor
server.listen(PORT, () => {
  console.log('🎸 MOLLERUSSA METAL FEST - Servidor ejecutándose en puerto:', PORT);
});