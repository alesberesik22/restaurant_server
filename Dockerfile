FROM node:latest
WORKDIR /app
ADD . .
EXPOSE 5000
RUN npm install
CMD npm run dev