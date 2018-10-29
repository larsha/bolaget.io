FROM node:10.12.0

COPY src /home/node/web/src
COPY package.json /home/node/web/package.json
COPY package-lock.json /home/node/web/package-lock.json
COPY nodemon.json /home/node/web/nodemon.json
WORKDIR /home/node/web
RUN chown node --recursive .

USER node
RUN npm ci
RUN npm run build

ENV NODE_ENV=production

CMD ["node", ".build/web.js"]
