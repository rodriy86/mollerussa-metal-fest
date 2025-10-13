FROM node:22.12-alpine

WORKDIR /app

# 1. COPIAR TODO EL PROYECTO PRIMERO
COPY . .

# 2. Verificar estructura
RUN echo "=== ESTRUCTURA DEL PROYECTO ===" && \
    ls -la frontend/

# 3. Instalar dependencias del frontend
RUN cd frontend && npm ci

# 4. Construir Angular (usa outputPath correcto)
RUN cd frontend && npx ng build --configuration=production

# 5. Verificar QUÉ se construyó
RUN echo "=== DESPUÉS DEL BUILD ===" && \
    echo "=== CONTENIDO DE DIST ===" && \
    ls -la frontend/dist/ && \
    echo "=== CONTENIDO DE DIST/MMF_WEB ===" && \
    ls -la frontend/dist/mmf_web/ && \
    echo "=== ¿EXISTE INDEX.HTML? ===" && \
    find /app -name "index.html" -type f

# 6. Instalar backend
RUN cd backend && npm ci --only=production

EXPOSE 3000

WORKDIR /app/backend
CMD ["node", "server.js"]