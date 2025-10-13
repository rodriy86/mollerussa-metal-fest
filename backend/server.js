import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// DEBUG: Verificar estructura de archivos
//const angularPath = path.join(__dirname, '../frontend/dist/mmf-web/browser');
const angularPath = path.join(__dirname, '../dist-build/browser');
console.log('🔍 Buscando Angular en:', angularPath);

// Listar toda la estructura del proyecto
console.log('📁 Estructura del proyecto:');
const listFiles = (dir, depth = 0) => {
  if (depth > 3) return; // Limitar profundidad
  try {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      console.log('  '.repeat(depth) + (stats.isDirectory() ? '📁 ' : '📄 ') + item);
      if (stats.isDirectory() && !item.includes('node_modules')) {
        listFiles(fullPath, depth + 1);
      }
    });
  } catch (error) {
    console.log('  '.repeat(depth) + '❌ No se pudo leer:', dir);
  }
};

try {
  listFiles(path.join(__dirname, '..'));
} catch (error) {
  console.log('❌ Error listando archivos:', error.message);
}

// Servir archivos estáticos
app.use(express.static(angularPath));

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando' });
});

// Ruta raíz
app.get('/', (req, res) => {
  const indexHtmlPath = path.join(angularPath, 'index.html');
  console.log('🔍 Intentando servir:', indexHtmlPath);
  
  if (fs.existsSync(indexHtmlPath)) {
    console.log('✅ Angular encontrado, sirviendo index.html');
    res.sendFile(indexHtmlPath);
  } else {
    console.log('❌ Angular NO encontrado en:', indexHtmlPath);
    res.send(`
      <html>
        <body>
          <h1>Mollerussa Metal Fest</h1>
          <p>Backend funcionando ✅</p>
          <p>Angular no encontrado en: ${indexHtmlPath} ❌</p>
          <p><a href="/api/health">Verificar backend</a></p>
        </body>
      </html>
    `);
  }
});

app.get('*', (req, res) => {
  const indexHtmlPath = path.join(angularPath, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    res.sendFile(indexHtmlPath);
  } else {
    res.status(404).send('Página no encontrada');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
});