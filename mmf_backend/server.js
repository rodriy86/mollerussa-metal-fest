import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend (Angular)
app.use(express.static(path.join(__dirname, '../frontend/dist/tu-app/browser')));

// Ruta de salud para verificar que el backend funciona
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta para crear payment intent con Stripe
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    console.log('Creando payment intent por:', amount);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convertir a centavos
      currency: currency || 'usd',
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      status: 'success'
    });
  } catch (error) {
    console.error('Error en payment intent:', error);
    res.status(500).json({ 
      error: error.message,
      status: 'error'
    });
  }
});

// Webhook para Stripe (IMPORTANTE para producción)
app.post('/api/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`❌ Error de webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Manejar el evento
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`✅ Pago exitoso para: ${paymentIntent.amount}`);
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log(`❌ Pago fallido: ${failedPayment.last_payment_error?.message}`);
      break;
    default:
      console.log(`🔔 Evento no manejado: ${event.type}`);
  }
  
  res.json({received: true});
});

// Todas las demás rutas van al Angular (para el Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/tu-app/browser/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📱 Frontend: sirviendo archivos estáticos de Angular`);
  console.log(`💳 Stripe: configurado correctamente`);
});