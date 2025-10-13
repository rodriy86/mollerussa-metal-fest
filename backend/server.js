import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middlewares
app.use(cors());
app.use(express.json());

// IMPORTANTE: Servir el SSR de Angular en lugar de archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend/dist/mmf-web/browser')));

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend con SSR funcionando' });
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

// Para SSR: todas las rutas van al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/mmf-web/browser/index.html'));
});



// AL FINAL DEL ARCHIVO, CAMBIA:
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
});