FROM node:14

WORKDIR /usr/src/proxy

COPY ./ ./

RUN npm install
