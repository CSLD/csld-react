FROM node:10-alpine

WORKDIR /opt/app

COPY package*.json ./

COPY yarn.lock ./

COPY . /opt/app

RUN yarn

ENV NODE_ENV production

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
