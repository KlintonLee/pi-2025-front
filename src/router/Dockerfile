# Etapa de build
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de produção
FROM node:18 AS production
WORKDIR /app

# Instala o pacote para servir arquivos estáticos
RUN npm install -g serve

# Copia o build da etapa anterior
COPY --from=builder /app/dist ./dist

# Porta padrão usada pelo Render
EXPOSE 10000

# Comando para servir a aplicação
CMD ["serve", "-s", "dist", "-l", "10000"]
