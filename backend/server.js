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

// DEBUG COMPLETO: Verificar estructura de dist-build
const distBuildPath = path.join(__dirname, '../dist-build');
console.log('🔍 Verificando dist-build en:', distBuildPath);

// Función para listar archivos recursivamente
const listFilesRecursive = (dir, prefix = '') => {
  try {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      console.log(prefix + (stats.isDirectory() ? '📁 ' : '📄 ') + item);
      if (stats.isDirectory() && !item.includes('node_modules')) {
        listFilesRecursive(fullPath, prefix + '  ');
      }
    });
  } catch (error) {
    console.log(prefix + '❌ No se pudo leer:', dir, error.message);
  }
};

// Verificar si dist-build existe y qué contiene
if (fs.existsSync(distBuildPath)) {
  console.log('✅ dist-build EXISTE');
  console.log('📁 CONTENIDO de dist-build:');
  listFilesRecursive(distBuildPath);
  
  // Verificar específicamente browser/
  const browserPath = path.join(distBuildPath, 'browser');
  if (fs.existsSync(browserPath)) {
    console.log('✅ browser/ EXISTE dentro de dist-build');
    console.log('📁 CONTENIDO de browser/:');
    listFilesRecursive(browserPath);
    
    // Verificar index.html
    const indexHtmlPath = path.join(browserPath, 'index.html');
    if (fs.existsSync(indexHtmlPath)) {
      console.log('✅ index.html EXISTE en browser/');
    } else {
      console.log('❌ index.html NO existe en browser/');
    }
  } else {
    console.log('❌ browser/ NO existe dentro de dist-build');
  }
} else {
  console.log('❌ dist-build NO EXISTE');
  
  // Listar qué sí existe en el directorio raíz
  console.log('📁 CONTENIDO del directorio raíz:');
  try {
    const rootDir = path.join(__dirname, '..');
    const items = fs.readdirSync(rootDir);
    items.forEach(item => {
      const fullPath = path.join(rootDir, item);
      const stats = fs.statSync(fullPath);
      console.log((stats.isDirectory() ? '📁 ' : '📄 ') + item);
    });
  } catch (error) {
    console.log('Error leyendo directorio raíz:', error.message);
  }
}

// Ruta temporal para debug
app.get('/debug', (req, res) => {
  const distBuildPath = path.join(__dirname, '../dist-build');
  const browserPath = path.join(distBuildPath, 'browser');
  const indexHtmlPath = path.join(browserPath, 'index.html');
  
  res.json({
    distBuildExists: fs.existsSync(distBuildPath),
    browserExists: fs.existsSync(browserPath),
    indexHtmlExists: fs.existsSync(indexHtmlPath),
    paths: {
      distBuild: distBuildPath,
      browser: browserPath,
      indexHtml: indexHtmlPath,
      currentDir: __dirname,
      rootDir: path.join(__dirname, '..')
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando' });
});

app.get('*', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Mollerussa Metal Fest - Debug</h1>
        <p>Backend funcionando ✅</p>
        <p><a href="/debug">Ver información de archivos</a></p>
        <p><a href="/api/health">Verificar backend</a></p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
});