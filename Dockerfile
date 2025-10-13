FROM node:22.12-alpine

WORKDIR /app

# 1. COPIAR TODO EL PROYECTO PRIMERO
COPY . .

# 2. Verificar estructura
RUN echo "=== ESTRUCTURA DEL PROYECTO ===" && \
    ls -la && \
    echo "=== CONTENIDO FRONTEND ===" && \
    ls -la frontend/ && \
    echo "=== ¿EXISTE angular.json? ===" && \
    ls -la frontend/angular.json

# 3. Instalar dependencias del frontend
RUN cd frontend && npm ci

# 4. Construir Angular (AHORA SÍ encontrará el workspace)
RUN cd frontend && npx ng build --configuration=production --output-path=dist

# 5. Instalar backend
RUN cd backend && npm ci --only=production

# 6. Verificar build exitoso
RUN echo "=== ARCHIVOS CONSTRUIDOS ===" && \
    find . -name "index.html" -type f && \
    ls -la frontend/dist/

EXPOSE 3000

WORKDIR /app/backend
CMD ["node", "server.js"]