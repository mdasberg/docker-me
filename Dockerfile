FROM node:latest

COPY app /var/www
COPY server.js /var/www
COPY package.json /var/www

WORKDIR /var/www

RUN npm install

EXPOSE 3001

ENTRYPOINT ["node", "server.js"]
