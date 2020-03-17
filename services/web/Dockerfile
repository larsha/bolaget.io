FROM node:13.10.1

USER node

RUN mkdir /home/node/web
WORKDIR /home/node/web

COPY package.json package-lock.json /home/node/web/

RUN npm ci

COPY . /home/node/web

RUN npm run build

ENV NODE_ENV=production

CMD ["node", ".build/web.js"]
