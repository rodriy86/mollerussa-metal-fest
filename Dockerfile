FROM node:22.12-alpine

WORKDIR /app
COPY . .

# 1. Build de frontend
RUN cd frontend && npm ci
RUN cd frontend && npm run build

# 2. Build de backend  
RUN cd backend && npm ci --only=production

# 3. VERIFICAR que server.js existe y es válido
RUN echo "=== VERIFICANDO SERVER.JS ===" && \
    ls -la backend/server.js && \
    node -c backend/server.js && \
    echo "✅ server.js es válido"

# 4. VERIFICAR estructura final
RUN echo "=== ESTRUCTURA FINAL ===" && \
    echo "=== ANGULAR ===" && \
    find /app/frontend/dist/mmf-web/browser -name "index.html" && \
    echo "=== BACKEND ===" && \
    ls -la backend/ && \
    echo "=== NODE_MODULES BACKEND ===" && \
    ls -la backend/node_modules/ | head -5

EXPOSE 3000

WORKDIR /app/backend

# 5. COMANDO CON MANEJO DE ERRORES
CMD ["sh", "-c", "echo '🚀 Iniciando servidor...' && node server.js"]