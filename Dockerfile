FROM node

WORKDIR /usr/src/app

ENV NODE_ENV=production=production

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

CMD [ "npm", "start" ]
