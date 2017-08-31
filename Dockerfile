FROM node:6

RUN mkdir /modules
WORKDIR /modules
ADD express-server/package.json .
RUN npm install

# to auto compile express server during development
RUN npm -g install nodemon

ENV NODE_PATH /modules/node_modules

RUN mkdir -p usr/src/app
WORKDIR /usr/src/app
