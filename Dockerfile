FROM node

WORKDIR /usr/src/app

COPY package*.json ./

COPY .env ./

RUN npm install

COPY . .

EXPOSE 7000

CMD [ "npm", "start" ]
