FROM node:21.7

WORKDIR /myapi
COPY package.json .
RUN npm install

COPY . .
CMD npm start