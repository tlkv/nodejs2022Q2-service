FROM node:16-alpine3.14

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json /usr/app

RUN npm install

COPY . .

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]