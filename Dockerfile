FROM node:16-alpine

RUN MKDIR -p /usr/ecommerse/products 

WORKDIR /usr/ecommerse/products/

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node","start"]