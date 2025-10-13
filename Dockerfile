FROM node:22.12-alpine

WORKDIR /app

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar archivos de dependencias
COPY backend/package.json backend/package-lock.json ./backend/
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Instalar dependencias del frontend
RUN cd frontend && npm ci

# Construir Angular
RUN cd frontend && ng build --configuration=production --output-path=dist

# Instalar backend (producción solo)
RUN cd backend && npm ci --only=production

# Copiar código fuente
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Verificar estructura final
RUN echo "=== ESTRUCTURA FINAL ===" && \
    find /app -name "index.html" -type f && \
    echo "=== FRONTEND DIST ===" && \
    ls -la /app/frontend/dist/

EXPOSE 3000

WORKDIR /app/backend
CMD ["node", "server.js"]