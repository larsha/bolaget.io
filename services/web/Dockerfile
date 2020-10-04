FROM node:14.13.0

USER node

RUN mkdir /home/node/web
WORKDIR /home/node/web

COPY package.json package-lock.json /home/node/web/

RUN npm ci

COPY . /home/node/web

RUN npm run build

ENV NODE_ENV=production

CMD ["node", ".build/web.js"]
