FROM node:16-alpine3.14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 4200

EXPOSE $PORT

CMD ["npm", "run", "start"]