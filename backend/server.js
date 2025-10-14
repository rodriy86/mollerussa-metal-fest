// server.js - SERVIDOR MOLLERUSSA METAL FEST
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockData, getBandById, getDetalleNoticiaById } from './data/mockData.js';

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

  // Otros endpoints
  '/api/events': (req, res) => sendJson(res, mockData.events || []),
  '/api/tickets': (req, res) => sendJson(res, mockData.tickets || []),
  '/api/info': (req, res) => sendJson(res, mockData.info || {}),
  '/api/health': (req, res) => sendJson(res, { status: 'OK', message: 'Mollerussa Metal Fest API' })
};

// Manejo de rutas API
const handleApiRequest = (req, res) => {
  const route = Object.keys(apiHandlers)
    .sort((a, b) => b.length - a.length) // Rutas más específicas primero
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
    // Fallback para Angular Router
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
  // Configuración CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.writeHead(200).end();

  // Manejo de rutas
  req.url.startsWith('/api/') ? handleApiRequest(req, res) : serveStaticFile(req, res);
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log('🎸 MOLLERUSSA METAL FEST - Servidor en puerto:', PORT);
  console.log('📡 Endpoints disponibles:');
  console.log('   • /api/bands, /api/bands/:id');
  console.log('   • /api/noticias, /api/noticias/:id, /api/noticias/:id/detalle');
  console.log('   • /api/events, /api/tickets, /api/info, /api/health');
});