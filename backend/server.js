// server.js - ENDPOINTS MOLLERUSSA METAL FEST
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockData, getBandById, getBandsByGenre } from './data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const angularPath = path.join(__dirname, '../frontend/dist/mmf-web/browser');

// Tipos MIME
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// API Routes
const apiRoutes = {
  '/api/health': (req, res) => {
    sendJson(res, { status: 'OK', message: 'Mollerussa Metal Fest API' });
  },

  '/api/bands': (req, res) => {
    sendJson(res, mockData.bands);
  },

  '/api/bands/:id': (req, res) => {
    const id = parseInt(req.url.split('/').pop());
    const band = getBandById(id);
    band ? sendJson(res, band) : sendError(res, 404, 'Banda no encontrada');
  },

  '/api/bands/genre/:genre': (req, res) => {
    const genre = decodeURIComponent(req.url.split('/').pop());
    const bands = getBandsByGenre(genre);
    sendJson(res, bands);
  },

  '/api/events': (req, res) => {
    sendJson(res, mockData.events);
  },

  '/api/tickets': (req, res) => {
    sendJson(res, mockData.tickets);
  },

  '/api/info': (req, res) => {
    sendJson(res, mockData.info);
  }
};

// Helper functions
function sendJson(res, data) {
  res.writeHead(200, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(data));
}

function sendError(res, code, message) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}

// Servidor principal
const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API calls
  if (req.url.startsWith('/api/')) {
    handleApiRequest(req, res);
    return;
  }

  // Archivos estáticos
  serveStaticFile(req, res);
});

function handleApiRequest(req, res) {
  try {
    const route = Object.keys(apiRoutes).find(route => 
      req.url === route || req.url.startsWith(route + '/')
    );
    
    if (route) {
      apiRoutes[route](req, res);
    } else {
      sendError(res, 404, 'Endpoint no encontrado');
    }
  } catch (error) {
    sendError(res, 500, 'Error interno del servidor');
  }
}

function serveStaticFile(req, res) {
  let filePath = angularPath;
  if (req.url === '/' || req.url === '') {
    filePath = path.join(angularPath, 'index.html');
  } else {
    filePath = path.join(angularPath, req.url);
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } else {
    const indexHtml = path.join(angularPath, 'index.html');
    if (fs.existsSync(indexHtml)) {
      const html = fs.readFileSync(indexHtml, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - No encontrado</h1>');
    }
  }
}

server.listen(PORT, () => {
  /*console.log('🎸 MOLLERUSSA METAL FEST 2024');
  console.log('🚀 API funcionando en puerto:', PORT);
  console.log('📡 Endpoints:');
  console.log('   /api/bands');
  console.log('   /api/bands/1');
  console.log('   /api/bands/genre/Heavy Metal');
  console.log('   /api/events');
  console.log('   /api/tickets');
  console.log('   /api/info');*/
  console.log('🚀 En marcha!');
});