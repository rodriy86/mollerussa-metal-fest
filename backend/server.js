import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend raíz funcionando',
    timestamp: new Date().toISOString()
  });
});

// Sin '0.0.0.0' - que Express lo maneje automáticamente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
  console.log('✅ Listo para recibir requests');
});