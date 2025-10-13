// server.js - CORREGIDO
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// Ruta CORREGIDA - usa __dirname para ser consistente
const angularPath = path.join(__dirname, '../frontend/dist/mmf-web/browser');
const indexHtml = path.join(angularPath, 'index.html');

console.log('🚀 Iniciando servidor en puerto:', PORT);
console.log('📁 Directorio backend:', __dirname);
console.log('🔍 Ruta Angular:', angularPath);
console.log('📄 Index.html existe:', fs.existsSync(indexHtml));

const server = http.createServer((req, res) => {
  if (fs.existsSync(indexHtml)) {
    const html = fs.readFileSync(indexHtml, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <h1>Mollerussa Metal Fest</h1>
          <p>Backend funcionando ✅</p>
          <p>Angular: ${fs.existsSync(indexHtml) ? '✅' : '❌'}</p>
          <p>Ruta: ${angularPath}</p>
        </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log('✅ Servidor activo en puerto', PORT);
});