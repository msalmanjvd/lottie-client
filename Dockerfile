FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD [ "npm", "start" ]