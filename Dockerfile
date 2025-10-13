FROM node:22.12-alpine
WORKDIR /app

# Copiar backend
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci
COPY backend/ ./backend/

# Copiar Angular YA CONSTRUIDO (desde tu local)
COPY dist-built/ ./frontend/dist/mmf-web/browser/

EXPOSE 3000
WORKDIR /app/backend
CMD ["npm", "start"]