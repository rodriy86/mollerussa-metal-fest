// server.js - VERSIÓN MÍNIMA
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3000;

// Ruta directa a Angular
const angularPath = path.join(process.cwd(), 'frontend', 'dist', 'mmf-web', 'browser');
const indexHtml = path.join(angularPath, 'index.html');

console.log('🚀 Iniciando servidor en puerto:', PORT);

const server = http.createServer((req, res) => {
  // Siempre responder con algo
  if (fs.existsSync(indexHtml)) {
    // Servir Angular
    const html = fs.readFileSync(indexHtml, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    // Fallback si no hay Angular
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <h1>Mollerussa Metal Fest</h1>
          <p>Backend funcionando ✅</p>
          <p>Angular: ${fs.existsSync(indexHtml) ? '✅' : '❌'}</p>
        </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log('✅ Servidor activo en puerto', PORT);
});