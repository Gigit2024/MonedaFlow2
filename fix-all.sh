#!/bin/bash
echo "=== REPARANDO MONEDAFLOW ==="

# 1. Corregir nombres
mv docker-compose.xml docker-compose.yml 2>/dev/null || true

# 2. Limpiar
rm -rf node_modules .next package-lock.json
docker-compose down -v 2>/dev/null || true

# 3. Configurar archivos básicos
cat > docker-compose.yml << 'DOCKEREOF'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
DOCKEREOF

cat > Dockerfile << 'DOCKERFILEEOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
DOCKERFILEEOF

# 4. Instalar
npm install

# 5. Construir
docker-compose build --no-cache
docker-compose up -d

echo "=== COMPLETADO ==="
echo "Accede a: http://localhost:3000"
