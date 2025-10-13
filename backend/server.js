// server.js - SERVIDOR COMPLETO (estáticos + Angular)
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const angularPath = path.join(__dirname, '../frontend/dist/mmf-web/browser');

// Tipos MIME para archivos estáticos
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

console.log('🚀 Servidor iniciado en puerto:', PORT);
console.log('📁 Angular path:', angularPath);

// Verificar estructura de archivos
if (fs.existsSync(angularPath)) {
  console.log('📄 Archivos en Angular:');
  const files = fs.readdirSync(angularPath);
  files.forEach(file => {
    const fullPath = path.join(angularPath, file);
    const stats = fs.statSync(fullPath);
    console.log('  ' + (stats.isDirectory() ? '📁 ' : '📄 ') + file);
  });
}

const server = http.createServer((req, res) => {
  // Evitar favicon requests
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Determinar la ruta del archivo
  let filePath = angularPath;
  if (req.url === '/' || req.url === '') {
    filePath = path.join(angularPath, 'index.html');
  } else {
    filePath = path.join(angularPath, req.url);
  }

  // Servir archivo estático si existe
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';
    
    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Error del servidor</h1>');
    }
  } else {
    // Si no encuentra el archivo, servir index.html (para Angular Router)
    const indexHtmlPath = path.join(angularPath, 'index.html');
    if (fs.existsSync(indexHtmlPath)) {
      try {
        const html = fs.readFileSync(indexHtmlPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Error leyendo Angular</h1>');
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Página no encontrada</h1>');
    }
  }
});

server.listen(PORT, () => {
  console.log('✅ Servidor listo en puerto:', PORT);
  console.log('🌐 URL: http://localhost:' + PORT);
});