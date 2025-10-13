FROM node:22.12-alpine

WORKDIR /app
COPY . .

# 1. Verificar estructura
RUN echo "=== ESTRUCTURA INICIAL ===" && \
    ls -la frontend/

# 2. Instalar dependencias
RUN cd frontend && npm ci

# 3. Construir Angular usando EL SCRIPT CORRECTO
RUN cd frontend && npm run build

# 4. VERIFICAR build exitoso
RUN echo "=== VERIFICANDO BUILD ===" && \
    echo "=== RUTA ESPERADA: dist/mmf-web/browser ===" && \
    if [ -d "frontend/dist/mmf-web/browser" ]; then \
      echo "✅ BUILD EXITOSO"; \
      echo "=== CONTENIDO ==="; \
      ls -la frontend/dist/mmf-web/browser/; \
      echo "=== ARCHIVOS PRINCIPALES ==="; \
      find frontend/dist/mmf-web/browser/ -name "index.html" -o -name "*.js" | head -5; \
    else \
      echo "❌ ERROR: dist/mmf-web/browser no se creó"; \
      echo "=== BUSCANDO OTRAS RUTAS ==="; \
      find /app -name "index.html" -type f; \
      echo "=== ESTRUCTURA DIST/ ==="; \
      if [ -d "frontend/dist" ]; then \
        find frontend/dist/ -type f | head -10; \
      fi; \
      exit 1; \
    fi

# 5. Backend
RUN cd backend && npm ci --only=production

EXPOSE 3000
WORKDIR /app/backend
CMD ["node", "server.js"]