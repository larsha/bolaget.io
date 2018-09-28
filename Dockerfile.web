FROM node:10.11.0

COPY . /home/node/web/
WORKDIR /home/node/web
RUN chown node --recursive .

USER node
RUN npm ci
RUN npm run build

ENV NODE_ENV=production

CMD ["node", ".build/web.js"]
