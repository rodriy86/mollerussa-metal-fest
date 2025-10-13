const express = require('express');
const cors = require('cors');
require('dotenv').config();

const globalVariables = require('./utils/globalVariables');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

// Middleware para variables globales
app.use((req, res, next) => {
    req.globalVars = globalVariables;
    next();
});

// Rutas
app.use('/api/users', userRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
    res.json({
        message: req.globalVars.messages.welcome,
        app: req.globalVars.app.name,
        version: req.globalVars.app.version
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: req.globalVars.messages.internalError 
    });
});

// Ruta no encontrada
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📱 Entorno: ${globalVariables.app.environment}`);
    console.log(`🔗 Frontend: ${process.env.FRONTEND_URL}`);
});

module.exports = app;