FROM node:22.12-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY backend/package.json backend/package-lock.json ./backend/
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Instalar dependencias
RUN cd backend && npm ci
RUN cd frontend && npm ci

# Copiar código fuente
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Construir Angular
RUN cd frontend && node node_modules/@angular/cli/bin/ng.js build --configuration=production --output-path=dist/mmf-web/browser

EXPOSE 3000

CMD ["cd", "backend", "&&", "npm", "start"] 