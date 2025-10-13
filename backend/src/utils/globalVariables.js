const globalVariables = {
    app: {
        name: "Mi App Angular + Node",
        version: "1.0.0",
        environment: process.env.NODE_ENV || 'development'
    },
    
    limits: {
        maxFileSize: 5 * 1024 * 1024,
        maxRequestsPerMinute: 100,
        sessionTimeout: 24 * 60 * 60 * 1000
    },
    
    messages: {
        welcome: "Bienvenido a la API",
        unauthorized: "No autorizado",
        internalError: "Error interno del servidor"
    },
    
    security: {
        jwtExpiresIn: '24h',
        passwordMinLength: 6
    }
};

module.exports = globalVariables;