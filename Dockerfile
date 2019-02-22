FROM node:8-alpine

EXPOSE 7001

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .
CMD ["npm test" ]
CMD ["sh", "-c", "npm start" ]