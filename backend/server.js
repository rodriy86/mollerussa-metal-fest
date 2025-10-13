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

// Ruta para archivos estáticos de Angular
const angularPath = path.join(__dirname, '../frontend/dist/mmf-web/browser');
app.use(express.static(angularPath));

// Ruta de salud del backend
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando',
    timestamp: new Date().toISOString()
  });
});

// ✅ Ruta raíz DEBE servir Angular, NO JSON
app.get('/', (req, res) => {
  const indexHtmlPath = path.join(angularPath, 'index.html');
  
  // Verificar si existe el index.html de Angular
  if (fs.existsSync(indexHtmlPath)) {
    console.log('✅ Sirviendo Angular desde:', indexHtmlPath);
    res.sendFile(indexHtmlPath);
  } else {
    console.log('❌ Angular no construido, mostrando fallback');
    res.send(`
      <html>
        <body>
          <h1>Mollerussa Metal Fest</h1>
          <p>Backend funcionando ✅</p>
          <p>Angular no está construido ❌</p>
          <p><a href="/api/health">Verificar backend</a></p>
        </body>
      </html>
    `);
  }
});

// ✅ Todas las demás rutas van a Angular (para el Router)
app.get('*', (req, res) => {
  const indexHtmlPath = path.join(angularPath, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    res.sendFile(indexHtmlPath);
  } else {
    res.status(404).send('Página no encontrada - Angular no construido');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
});