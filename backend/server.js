// server.js - Node.js PURO, cero dependencias
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  
  // Ruta de salud
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'OK', 
      message: 'Backend funcionando SIN Express',
      timestamp: new Date().toISOString()
    }));
    return;
  }
  
  // Ruta principal - intenta servir Angular
  if (req.url === '/' || req.url === '/index.html') {
    const angularPath = path.join(__dirname, '../frontend/dist');
    const indexHtmlPath = path.join(angularPath, 'index.html');
    
    try {
      if (fs.existsSync(indexHtmlPath)) {
        const html = fs.readFileSync(indexHtmlPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <body>
              <h1>Mollerussa Metal Fest</h1>
              <p>Backend funcionando ✅</p>
              <p>Angular no encontrado en: ${indexHtmlPath}</p>
              <p><a href="/api/health">Verificar API</a></p>
            </body>
          </html>
        `);
      }
    } catch (error) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body>
            <h1>Mollerussa Metal Fest</h1>
            <p>Backend funcionando ✅</p>
            <p>Error: ${error.message}</p>
          </body>
        </html>
      `);
    }
    return;
  }
  
  // Cualquier otra ruta
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    message: 'Mollerussa Metal Fest API',
    endpoint: req.url,
    method: req.method
  }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('🎸 ====================================');
  console.log('🤘 MOLLERUSSA METAL FEST BACKEND');
  console.log('🚀 Node.js PURO - Sin dependencias');
  console.log('📡 Puerto: ' + PORT);
  console.log('🌐 http://localhost:' + PORT);
  console.log('🎸 ====================================');
});