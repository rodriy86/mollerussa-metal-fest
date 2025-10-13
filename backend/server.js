// RUTAS CORRECTAS según tu package.json
const possibleAngularPaths = [
  path.join(__dirname, '../frontend/dist/mmf-web/browser'),  // ✅ RUTA CORRECTA
  path.join(__dirname, '../frontend/dist/mmf_web'),          // Otra posible
  path.join(__dirname, '../frontend/dist'),                  // Fallback
];

let angularPath = null;
let indexHtmlPath = null;

console.log('🔍 Buscando Angular...');
for (const possiblePath of possibleAngularPaths) {
  const testPath = path.join(possiblePath, 'index.html');
  console.log('  Probando:', possiblePath);
  if (fs.existsSync(testPath)) {
    angularPath = possiblePath;
    indexHtmlPath = testPath;
    console.log('✅ ANGULAR ENCONTRADO en:', angularPath);
    break;
  }
}

// El resto del server.js igual...

// Debug completo
if (angularPath) {
  console.log('📁 Contenido de Angular:');
  try {
    const files = fs.readdirSync(angularPath);
    files.forEach(file => {
      const fullPath = path.join(angularPath, file);
      const stats = fs.statSync(fullPath);
      console.log('  ' + (stats.isDirectory() ? '📁 ' : '📄 ') + file);
    });
  } catch (error) {
    console.log('❌ Error leyendo contenido:', error.message);
  }
} else {
  console.log('❌ ANGULAR NO ENCONTRADO en ninguna ruta');
  // Listar qué SÍ existe
  console.log('📁 Estructura actual:');
  possibleAngularPaths.forEach(p => {
    console.log('  ', p, '- Existe:', fs.existsSync(p));
    if (fs.existsSync(p)) {
      try {
        const items = fs.readdirSync(p);
        console.log('    Contenido:', items);
      } catch (e) {
        console.log('    Error leyendo:', e.message);
      }
    }
  });
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
      message: 'Backend funcionando',
      angularFound: !!angularPath,
      angularPath: angularPath,
      timestamp: new Date().toISOString()
    }));
    return;
  }
  
  // Ruta principal - servir Angular si existe
  if (req.url === '/' || req.url === '/index.html') {
    if (angularPath && indexHtmlPath) {
      try {
        const html = fs.readFileSync(indexHtmlPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        console.log('✅ Sirviendo Angular desde:', indexHtmlPath);
      } catch (error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <body>
              <h1>Mollerussa Metal Fest</h1>
              <p>Backend funcionando ✅</p>
              <p>Error leyendo Angular: ${error.message}</p>
            </body>
          </html>
        `);
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body>
            <h1>Mollerussa Metal Fest</h1>
            <p>Backend funcionando ✅</p>
            <p>Angular no encontrado ❌</p>
            <p><strong>Debug info:</strong></p>
            <ul>
              <li>Directorio: ${__dirname}</li>
              <li>Angular encontrado: ${!!angularPath}</li>
              <li>Rutas probadas: ${possibleAngularPaths.join(', ')}</li>
            </ul>
            <p><a href="/api/health">Verificar API</a></p>
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('🎸 ====================================');
  console.log('🤘 MOLLERUSSA METAL FEST BACKEND');
  console.log('🚀 Node.js PURO - Sin dependencias');
  console.log('📡 Puerto: ' + PORT);
  console.log('🌐 http://localhost:' + PORT);
  console.log('🔧 Angular path: ' + (angularPath || 'NO ENCONTRADO'));
  console.log('🎸 ====================================');
});