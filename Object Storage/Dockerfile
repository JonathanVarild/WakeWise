FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3002

CMD ["node", "src/server.js"]
