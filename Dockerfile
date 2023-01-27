FROM node:16-alpine

WORKDIR /Products

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run build

ENV PORT = 8080

CMD ["npm","start"]