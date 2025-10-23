FROM node:22.12-alpine

WORKDIR /app
COPY . .

# Instalar y construir
#RUN cd frontend && npm ci && npm run build
RUN cd frontend && npm ci --legacy-peer-deps && npm run build
RUN cd backend && npm ci --only=production

EXPOSE 3000
WORKDIR /app/backend

CMD ["node", "server.js"]