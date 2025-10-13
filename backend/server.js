// server.js - Node.js PURO, cero dependencias
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORREGIDO: Usar process.env.PORT para Railway
const PORT = process.env.PORT || 3000;

// ✅ AÑADIR: Debug de rutas al inicio
console.log('🔍 Iniciando servidor...');
console.log('📁 Directorio actual:', __dirname);
console.log('🔧 Puerto:', PORT);

// Verificar si existe Angular
const angularPath = path.join(__dirname, '../frontend/dist');
const indexHtmlPath = path.join(angularPath, 'index.html');
console.log('🔍 Ruta de Angular:', angularPath);
console.log('📄 Index.html existe:', fs.existsSync(indexHtmlPath));

if (fs.existsSync(angularPath)) {
  console.log('📁 Contenido de Angular:');
  try {
    const files = fs.readdirSync(angularPath);
    files.forEach(file => {
      const fullPath = path.join(angularPath, file);
      const stats = fs.statSync(fullPath);
      console.log('  ' + (stats.isDirectory() ? '📁 ' : '📄 ') + file);
    });
  } catch (error) {
    console.log('❌ Error leyendo Angular:', error.message);
  }
} else {
  console.log('❌ Carpeta Angular no existe:', angularPath);
}

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
      timestamp: new Date().toISOString(),
      angularPath: angularPath,
      angularExists: fs.existsSync(angularPath),
      indexHtmlExists: fs.existsSync(indexHtmlPath)
    }));
    return;
  }
  
  // Ruta principal - intenta servir Angular
  if (req.url === '/' || req.url === '/index.html') {
    try {
      if (fs.existsSync(indexHtmlPath)) {
        const html = fs.readFileSync(indexHtmlPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        console.log('✅ Sirviendo Angular desde:', indexHtmlPath);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <body>
              <h1>Mollerussaaa Metal Fest</h1>
              <p>Backend funcionando ✅</p>
              <p>Angular no encontrado en: ${indexHtmlPath}</p>
              <p><strong>Debug info:</strong></p>
              <ul>
                <li>Directorio: ${__dirname}</li>
                <li>Angular path: ${angularPath}</li>
                <li>Existe: ${fs.existsSync(angularPath)}</li>
              </ul>
              <p><a href="/api/health">Verificar API</a></p>
            </body>
          </html>
        `);
        console.log('❌ Angular no encontrado en:', indexHtmlPath);
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
      console.log('❌ Error sirviendo Angular:', error.message);
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

server.listen(PORT, () => {
  console.log('🎸 ====================================');
  console.log('🤘 MOLLERUSSA METAL FEST BACKEND');
  console.log('🚀 Node.js PURO - Sin dependencias');
  console.log('📡 Puerto: ' + PORT);
  console.log('🌐 http://localhost:' + PORT);
  console.log('🎸 ====================================');
});