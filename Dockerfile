FROM node:20.5.1-alpine

RUN apk add --no-cache --virtual g++ make py3-pip

WORKDIR /usr/src/app

ENV NODE_ENV=production=production

COPY package*.json ./

RUN npm install

COPY . .

RUN apk del .gyp

EXPOSE 7000

CMD [ "npm", "start" ]
