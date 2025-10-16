// server.js - SERVIDOR MOLLERUSSA METAL FEST
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockData, getBandById, getDetalleNoticiaById } from './data/mockData.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const angularPath = path.join(__dirname, '../frontend/dist/mmf-web/browser');

// Configuración
const mimeTypes = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};

// Utilidades
const sendJson = (res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
};

const sendError = (res, code, message) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
};

const extractIdFromUrl = (url) => {
  const match = url.match(/\/(\d+)(?:\/|$)/);
  return match ? parseInt(match[1]) : null;
};

// Enviar email de acreditación
const enviarEmailAcreditacion = async (formData) => {
  try {
    //console.log('📧 [EMAIL-1] Iniciando envío de email con Gmail...');
    const nodemailer = await import('nodemailer');
    
    //console.log('🔍 [EMAIL-2] Configurando Gmail...');
    
    // 🔥 CONFIGURACIÓN CORRECTA PARA GMAIL
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rodriy86.maps@gmail.com', // 🔥 Tu email COMPLETO
        pass: process.env.GMAIL_APP_PASSWORD // 🔥 SOLO el App Password
      }
    });

    //console.log('🔐 [EMAIL-3] Verificando conexión con Gmail...');
    await transporter.verify();
    //console.log('✅ [EMAIL-4] Conexión con Gmail verificada');

    // ... (el resto del código del email se mantiene igual)
    const diasTexto = formData.dias && formData.dias.length > 0 
      ? formData.dias.join(', ') 
      : 'No especificado';

    const mailOptions = {
      from: `"Mollerussa Metal Fest" <rodriy86.maps@gmail.com>`,
      to: 'rodriy86@gmail.com',
      subject: `🎤 Solicitut  d'acreditació - ${formData.tipo} - ${formData.nombre}`,
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
            <h2>Nueva Solicitud de Acreditación</h2>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>📋 Información Personal</h3>
              <p><span class="label">Tipo:</span> ${formData.tipo === 'prensa' ? '📰 Medio de Comunicación' : '🌟 Influencer/Creador'}</p>
              <p><span class="label">Nombre:</span> ${formData.nombre}</p>
              <p><span class="label">Email:</span> ${formData.email}</p>
              <p><span class="label">Teléfono:</span> ${formData.telefono || 'No especificado'}</p>
              <p><span class="label">Documento:</span> ${formData.documentoIdentidad || 'No especificado'}</p>
              <p><span class="label">Ciudad/País:</span> ${formData.ciudadResidencia || 'No especificado'}</p>
              <p><span class="label">Redes Sociales:</span> ${formData.redesSociales || 'No especificado'}</p>
            </div>

            ${formData.tipo === 'prensa' ? `
            <div class="section">
              <h3>📰 Información del Medio</h3>
              <p><span class="label">Medio:</span> ${formData.medio || 'No especificado'}</p>
            </div>
            ` : `
            <div class="section">
              <h3>🌟 Información del Creador</h3>
              <p><span class="label">Plataformas y Seguidores:</span><br>${formData.plataformas || 'No especificado'}</p>
            </div>
            `}

            <div class="section">
              <h3>📝 Cobertura Propuesta</h3>
              <p>${(formData.cobertura || 'No especificada').replace(/\n/g, '<br>')}</p>
            </div>

            <div class="section">
              <h3>🔧 Necesidades Especiales</h3>
              <p>${formData.necesidadesEspeciales || 'No especificadas'}</p>
            </div>

            <div class="section">
              <h3>📅 Días de Asistencia</h3>
              <p>${diasTexto}</p>
            </div>

            <div class="section">
              <h3>⏰ Información de la Solicitud</h3>
              <p><span class="label">Fecha:</span> ${new Date().toLocaleString('es-ES')}</p>
            </div>
          </div>

          <div class="footer">
            <p>🎸 Mollerussa Metal Fest - Sistema de Acreditaciones</p>
          </div>
        </body>
        </html>
      `
    };

    //console.log('📤 [EMAIL-5] Enviando email a rodriy86@gmail.com...');
    const result = await transporter.sendMail(mailOptions);
    /*console.log('✅ [EMAIL-6] Email enviado correctamente. ID:', result.messageId);
    console.log('✅ [EMAIL-7] Respuesta:', result.response);*/
    return result;
    
  } catch (error) {
    /*console.error('❌ [EMAIL-ERROR] Error enviando email con Gmail:');
    console.error('   - Mensaje:', error.message);
    console.error('   - Código:', error.code);
    
    if (error.code === 'EAUTH') {
      console.error('🔐 PROBLEMA DE AUTENTICACIÓN CON GMAIL:');
      console.error('   1. ¿Activaste la verificación en 2 pasos?');
      console.error('   2. ¿Generaste un APP PASSWORD (no la contraseña normal)?');
      console.error('   3. Verifica en: https://myaccount.google.com/apppasswords');
    }*/
    
    throw error;
  }
};

// Handlers de API
const apiHandlers = {
  // Bandas
  '/api/bands': (req, res) => sendJson(res, mockData.bands),
  '/api/bands/:id': (req, res) => {
    const id = extractIdFromUrl(req.url);
    const band = id && getBandById(id);
    band ? sendJson(res, band) : sendError(res, 404, 'Banda no encontrada');
  },

  // Noticias
  '/api/noticias': (req, res) => sendJson(res, mockData.noticias),
  '/api/noticias/:id': (req, res) => {
    const id = extractIdFromUrl(req.url);
    const noticia = id && mockData.noticias.find(n => n.id === id);
    noticia ? sendJson(res, noticia) : sendError(res, 404, 'Noticia no encontrada');
  },

  // Detalle Noticias
  '/api/noticias/:id/detalle': (req, res) => {
    const id = extractIdFromUrl(req.url);
    const detalleNoticia = id && getDetalleNoticiaById(id);
    detalleNoticia ? sendJson(res, detalleNoticia) : sendError(res, 404, 'Detalle no encontrado');
  },

  '/api/acreditacion': async (req, res) => {
    //console.log('🔔 [1] Endpoint /api/acreditacion llamado - Método:', req.method);

    if (req.method !== 'POST') {
      //console.log('❌ Método no permitido:', req.method);
      return sendError(res, 405, 'Método no permitido');
    }

    try {
      let body = '';
      //console.log('📦 [2] Esperando datos del body...');

      req.on('data', chunk => {
        body += chunk.toString();
        //console.log('📥 [3] Recibiendo chunk de datos...');
      });

      req.on('end', async () => {
        //console.log('✅ [4] Todos los datos recibidos. Longitud:', body.length);

        try {
          const formData = JSON.parse(body);
          /*console.log('📋 [5] JSON parseado correctamente');
          console.log('   - Tipo:', formData.tipo);
          console.log('   - Nombre:', formData.nombre);
          console.log('   - Email:', formData.email);*/

          // Validación básica
          if (!formData.nombre || !formData.email || !formData.tipo) {
            return sendError(res, 400, 'Datos incompletos');
          }

          if (!formData.dias) {
            formData.dias = [];
          }

          //console.log('📧 [7] Llamando a enviarEmailAcreditacion...');
          await enviarEmailAcreditacion(formData);
          //console.log('✅ [8] Email procesado correctamente');

          // Guardar en archivo JSON (backup)
          const acreditacionesPath = path.join(__dirname, 'data', 'acreditaciones.json');
          //console.log('💾 [9] Guardando backup en:', acreditacionesPath);

          const acreditaciones = fs.existsSync(acreditacionesPath)
            ? JSON.parse(fs.readFileSync(acreditacionesPath, 'utf8'))
            : [];

          acreditaciones.push({
            ...formData,
            fecha: new Date().toISOString(),
            id: Date.now()
          });

          fs.writeFileSync(acreditacionesPath, JSON.stringify(acreditaciones, null, 2));
          //console.log('💾 [10] Backup guardado correctamente');

          sendJson(res, {
            success: true,
            message: 'Solicitud enviada correctamente',
            id: Date.now()
          });
          //console.log('🎉 [11] Respuesta enviada al frontend');

        } catch (error) {
          //console.error('❌ [ERROR] Error procesando acreditación:', error);
          sendError(res, 500, 'Error interno del servidor');
        }
      });

    } catch (error) {
      //console.error('💥 [ERROR] Error en endpoint:', error);
      sendError(res, 500, 'Error interno del servidor');
    }
  },//fi acreditacio

  // Otros endpoints
  '/api/events': (req, res) => sendJson(res, mockData.events || []),
  '/api/tickets': (req, res) => sendJson(res, mockData.tickets || []),
  '/api/info': (req, res) => sendJson(res, mockData.info || {}),
  '/api/health': (req, res) => sendJson(res, { status: 'OK', message: 'Mollerussa Metal Fest API' })
};

// Manejo de rutas API
const handleApiRequest = (req, res) => {
  const route = Object.keys(apiHandlers)
    .sort((a, b) => b.length - a.length)
    .find(route => {
      const pattern = new RegExp('^' + route.replace(/:\w+/g, '([^/]+)') + '$');
      return pattern.test(req.url) || req.url === route || req.url.startsWith(route + '/');
    });

  route ? apiHandlers[route](req, res) : sendError(res, 404, 'Endpoint no encontrado');
};

// Servir archivos estáticos
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.writeHead(200).end();

  req.url.startsWith('/api/') ? handleApiRequest(req, res) : serveStaticFile(req, res);
});

// Iniciar servidor
server.listen(PORT, () => {
  /*console.log('🎸 MOLLERUSSA METAL FEST - Servidor en puerto:', PORT);
  console.log('📡 Endpoints disponibles:');
  console.log('   • /api/bands, /api/bands/:id');
  console.log('   • /api/noticias, /api/noticias/:id, /api/noticias/:id/detalle');
  console.log('   • 🔥 /api/acreditacion (POST)');
  console.log('   • /api/events, /api/tickets, /api/info, /api/health');*/
  console.log('Server en marcha!');
});