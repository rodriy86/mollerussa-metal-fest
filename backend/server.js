import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middlewares
app.use(cors());
app.use(express.json());

// DEBUG: Verificar si la carpeta existe
const staticPath = path.join(__dirname, '../frontend/dist/mmf-web/browser');
console.log('📁 Ruta de archivos estáticos:', staticPath);

try {
  const files = fs.readdirSync(staticPath);
  console.log('✅ Archivos en la carpeta:', files);
} catch (error) {
  console.log('❌ Error accediendo a la carpeta:', error.message);
}

// Servir archivos estáticos
app.use(express.static(staticPath));

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando' });
});

// Ruta para verificar archivos
app.get('/api/debug-files', (req, res) => {
  try {
    const files = fs.readdirSync(staticPath);
    res.json({ files, staticPath });
  } catch (error) {
    res.json({ error: error.message, staticPath });
  }
});

// Rutas de Stripe
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Todas las demás rutas van al Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
});