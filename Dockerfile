FROM node:18-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
EXPOSE 5000
CMD npm run dev